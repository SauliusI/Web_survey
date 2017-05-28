using Moonshine.RestfulService.DA.Contracts;
using System;
using System.Collections.Generic;
using Moonshine.RestfulService.DA.Entities;
using System.Linq;
using Moonshine.RestfulService.Utilities;
using Moonshine.RestfulService.DA.ApiContracts;
using Microsoft.EntityFrameworkCore;

namespace Moonshine.RestfulService.DA
{
    public class SurveyRepository : RepositoryBase, ISurveyRepository
    {
        public SurveyRepository(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public IEnumerable<Answers> GetQuestionAnswers(Guid questionID)
        {
            return Context.Answer.Where(x => x.QuestionId == questionID);
        }

        public IEnumerable<Questions> GetSurveyQuestion(Guid surveyID)
        {
            return Context.Survey
                .Include(c => c.Questions)
                .ThenInclude(x => x.Results)
                .SingleOrDefault(x => x.Id == surveyID)
                .Questions;
        }

        public IEnumerable<Survey> GetSurveys()
        {
            return Context.Survey.OrderBy(t => t.Name);
        }

        public Guid SaveSurvey(SurveyRequest survey, User user)
        {
            if (survey != null)
            {
                try
                {
                    var surveyGuid = Guid.NewGuid();
                    Context.Survey.Add(new Survey
                    {
                        User = user ?? new User
                        {
                            Email = "asdasd@asdasd.lt",
                            Id = Guid.NewGuid(),
                            UserName = "bai"
                        },
                        Date = survey.Date,
                        Description = survey.Description,
                        Id = surveyGuid,
                        Name = survey.Name,
                        IsActive = true,
                        UserId = user.Id
                    });
                    int questionOrderId = 0;
                    Context.Question.AddRange(survey.Questions.Select(x =>
                    {
                        var questionId = x.Id == Guid.Empty ? Guid.NewGuid() : x.Id;
                        if (x.Options != null)
                        {
                            int questionCount = 0;
                            Context.Answer.AddRange(x.Options.Select(option => new Answers
                            {
                                QuestionId = questionId,
                                Id = Guid.NewGuid(),
                                OptionName = option,
                                OptionNumber = questionCount++
                            }));
                        }
                        return new Questions
                        {
                            SurveyId = surveyGuid,
                            Id = questionId,
                            QuestionNumber = questionOrderId++,
                            MaxDescription = x.MaxDescription,
                            MinDescription = x.MinDescription,
                            Question = x.QuestionName,
                            QuestionDescription = x.QuestionDescription,
                            Range = x.Range,
                            Type = x.Type.ToString()
                        };
                    }));
                    Context.SaveChanges();
                    return surveyGuid;
                }
                catch { }
            }
            return Guid.Empty;
        }

        public void SaveSurveyAnswers(IEnumerable<Results> answers, User user)
        {
            if (answers != null)
            {
                var questionId = answers.First().QuestionId;
                var surveyId = Context.Question.First(x => x.Id == questionId).SurveyId;
                var surveyDate = Context.Survey.First(x => x.Id == surveyId).Date;
                if (DateTime.Now > surveyDate)
                    throw new Exception("Survey has expired");
                if (!Context.Survey.First(x => x.Id == surveyId).IsActive)
                    throw new Exception("This survey is disabled");
                //TODO: ADD CHECK FOR USER(NOW CHECKS IF SURVEY WAS ANSWERED BY ANY USER)
                //if (Context.Result.FirstOrDefault(x => x.QuestionId == questionId) != null)
                //    throw new Exception("User already answered this survey");
                foreach (var answer in answers)
                {
                    if (answer.QuestionId == Guid.Empty)
                        throw new Exception("No such question. shouldn't happen");
                    answer.UserId = user.Id;
                    Context.Result.Add(answer);
                }
                Context.SaveChanges();
            }
        }
    }
}

