using Moonshine.RestfulService.DA.ApiContracts;
using Moonshine.RestfulService.DA.Entities;
using System;
using System.Collections.Generic;

namespace Moonshine.RestfulService.DA.Contracts
{
    public interface ISurveyRepository
    {
        Guid SaveSurvey(SurveyRequest survey, User user);
        void SaveSurveyAnswers(IEnumerable<Results> answers, User user);
        IEnumerable<Questions> GetSurveyQuestion(Guid surveyID);
        IEnumerable<Answers> GetQuestionAnswers(Guid questionID);
        IEnumerable<Survey> GetSurveys();
    }
}
