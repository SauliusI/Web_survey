using System.Collections.Generic;

namespace Moonshine.RestfulService.DA.ApiContracts
{
    public class ResultsPrecentReponse
    {
        public IEnumerable<QuestionsResponse> Results { get; set; }
    }
}
