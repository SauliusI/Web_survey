using System;
using System.Collections.Generic;

namespace Moonshine.RestfulService.DA.ApiContracts
{
    public class QuestionsResponse
    {
        public int QuestionNumber { get; set; }
        public string Question { get; set; }
        public string Type { get; set; }
        public int Range { get; set; }
        public IEnumerable<AnswerResults> AnswerResults { get; set; }
        public IEnumerable<Answer> AnswerOptions { get; set; }
    }
}
