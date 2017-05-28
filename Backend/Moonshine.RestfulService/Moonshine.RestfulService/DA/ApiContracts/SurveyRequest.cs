namespace Moonshine.RestfulService.DA.ApiContracts
{
    using System;
    using System.Collections.Generic;

    public class SurveyRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public IEnumerable<QuestionRequest> Questions { get; set; }
    }
}
