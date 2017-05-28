using Moonshine.RestfulService.DA.ApiContracts.Values;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;

namespace Moonshine.RestfulService.DA.ApiContracts
{
    public class QuestionRequest
    {
        public string QuestionName { get; set; }
        public string QuestionDescription { get; set; }
        public int QuestionNumber { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public QuestionType Type { get; set; }
        public Guid Id { get; set; }
        public string MinDescription { get; set; }
        public string MaxDescription { get; set; }
        public int Range { get; set; }
        public bool IsMandatory { get; set; }
        public IEnumerable<string> Options { get; set; }
    }
}
