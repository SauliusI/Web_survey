using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Moonshine.RestfulService.DA.ApiContracts
{
    public class AnswerResults
    {
        public string Answer { get; set; }
        public double Percentage { get; set; }
        public string User { get; set; }
    }
}
