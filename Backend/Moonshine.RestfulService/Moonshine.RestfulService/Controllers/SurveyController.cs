using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moonshine.RestfulService.DA.ApiContracts;
using Moonshine.RestfulService.DA.ApiContracts.Values;
using Moonshine.RestfulService.DA.Contracts;
using Moonshine.RestfulService.DA.Entities;
using Moonshine.RestfulService.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Moonshine.RestfulService.Controllers
{
    [Produces("application/json")]
    [Route("api/Survey")]
    public class SurveyController : Controller
    {
        private readonly ISurveyRepository _surveyRepository;
        private readonly UserManager<User> _userManager;

        public SurveyController(ISurveyRepository surveyRepository, UserManager<User> userManager)
        {
            _surveyRepository = surveyRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public JsonResult GetSurveys()
        {
            try
            {
                var response = _surveyRepository.GetSurveys();
                return Json(response);
            }
            catch (Exception e)
            {
                return Json(new { errorMessage = e.Message });
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateSurvey([FromBody]SurveyRequest survey)
        {
            try
            {
                if (survey == null) return BadRequest("Invalid request argument.");

                var user = await _userManager.FindByNameAsync(User.Identity.Name);

                var response = _surveyRepository.SaveSurvey(survey, user);
                if (response == Guid.Empty) return StatusCode((int)HttpStatusCode.NotModified, "Was not able to create survey entry in data storage.");

                return StatusCode((int)HttpStatusCode.Created, response);

            }
            catch (ArgumentNullException)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "User was not found.");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "Ops! Something went wrong...");
            }
        }

        [Authorize]
        [HttpPost("response/")]
        public async Task<JsonResult> SaveSurveyAnswers([FromBody]IEnumerable<Results> results)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                _surveyRepository.SaveSurveyAnswers(results, user);
                return Json("success");
            }
            catch (Exception e)
            {
                return Json(new { errorMessage = e.Message });
            }
        }

        [HttpGet("question/{surveyID}")]
        public JsonResult GetSurveyQuestion(Guid surveyID)
        {
            try
            {
                var results = new List<QuestionRequest>();
                foreach (var question in _surveyRepository.GetSurveyQuestion(surveyID))
                {
                    results.Add(new QuestionRequest
                    {
                        QuestionName = question.Question,
                        QuestionDescription = question.Question,
                        QuestionNumber = question.QuestionNumber,
                        MinDescription = question.MinDescription,
                        MaxDescription = question.MaxDescription,
                        Range = question.Range,
                        Id = question.Id,
                        Type = (QuestionType)Enum.Parse(typeof(QuestionType), question.Type),
                        Options = _surveyRepository.GetQuestionAnswers(question.Id)
                            .OrderBy(x => x.OptionNumber)
                            .Select(x => x.OptionName)
                    });
                }

                return Json(results.OrderBy(x => x.QuestionNumber));
            }

            catch (Exception e)
            {
                return Json(new { errorMessage = e.Message });
            }
        }

        [HttpGet("result/{surveyID}")]
        public ResultsPrecentReponse GetSurveyResults(Guid surveyID)
        {
            try
            {
                var results = new List<QuestionsResponse>();
                foreach (var question in _surveyRepository.GetSurveyQuestion(surveyID))
                {
                    var totalResults = question.Results.Count();
                    results.Add(new QuestionsResponse
                    {
                        QuestionNumber = question.QuestionNumber,
                        Question = question.Question,
                        Type = question.Type,
                        Range = question.Range,
                        AnswerResults =
                            question.Results
                                .GroupBy(x => x.SelectedResult)
                                .OrderBy(x => x.Key)
                                .Select(x => new AnswerResults
                                {
                                    Answer = x.Key.ToString(),
                                    Percentage = x.Count() == 0
                                        ? 0
                                        : (((double)x.Count() / (double)totalResults) * 100),
                                    User = (_userManager.FindByIdAsync(x.FirstOrDefault(y => x.Key == y.SelectedResult)?.UserId.ToString() ?? "")).Result?.UserName,
                                }),
                        AnswerOptions = _surveyRepository.GetQuestionAnswers(question.Id)
                            .OrderBy(x => x.OptionNumber)
                            .Select(x => new Answer
                            {
                                AnswerOption = x.OptionName,
                                AnswerNumber = x.OptionNumber
                            })
                    });
                }
                Ok();

                foreach (var result in results)
                {
                    var realResults = new List<AnswerResults>();
                    if (result.Type == "CheckBox")
                    {
                        var resultNumber = result.AnswerResults.Count();
                        var optionNumber = result.AnswerOptions.Count();
                        var howManySelected = new int();
                        for (int i = 0; i < optionNumber; i++)
                        {
                            var oneResult = new AnswerResults();
                            howManySelected = 0;
                            foreach (var selected in result.AnswerResults)
                            {
                                string[] ans = selected.Answer.Split('[', ',', ']');
                                if (ans[i + 1] == "true")
                                {
                                    howManySelected++;
                                }
                                //                                if (selected.Answer.Substring((i * 5)+x, 4) == "true")
                                //                                {
                                //                                    howManySelected++;
                                //                                }
                                //                                else if(selected.Answer.Substring((i * 5) + x, 5) == "false")
                                //                                {
                                //                                    x++;
                                //                                }


                            }
                            oneResult.Answer = i.ToString();
                            if (howManySelected == 0)
                            {
                                oneResult.Percentage = 0;
                            }
                            else
                            {
                                oneResult.Percentage = (double)howManySelected / (double)resultNumber * 100;
                            }
                            realResults.Add(oneResult);

                        }
                        result.AnswerResults = realResults;
                    }
                }
                return new ResultsPrecentReponse { Results = results };
            }
            catch (Exception ex)
            {
                StatusCode((int)HttpStatusCode.NotFound, "Was not able to extract precentage of resulsts.");
            }
            return null;
        }

        [HttpGet("answer/{questionID}")]
        public JsonResult GetQuestionAnswers(Guid questionID)
        {
            try
            {
                var results = _surveyRepository.GetQuestionAnswers(questionID)
                    .Select(x => new Answers
                    {
                        Id = x.Id,
                        OptionName = x.OptionName,
                        OptionNumber = x.OptionNumber
                    })
                    .OrderBy(x => x.OptionNumber)
                    .ToList();

                return Json(results);
            }

            catch (Exception e)
            {
                return Json(new { errorMessage = e.Message });
            }
        }



    }
}