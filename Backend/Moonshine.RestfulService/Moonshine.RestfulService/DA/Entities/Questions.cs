using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moonshine.RestfulService.DA.Entities
{
    public  class Questions
    {
        public Guid Id { get; set; }
        public Guid SurveyId { get; set; }
        public int QuestionNumber { get; set; }
        public string Question { get; set; }
        public string QuestionDescription { get; set; }
        public string Type { get; set; }
        public string MinDescription { get; set; }
        public string MaxDescription { get; set; }
        public int Range { get; set; }
        public bool IsMandatory { get; set; }
        [ForeignKey(nameof(SurveyId))]
        public virtual Survey Survey { get; set; }
        public virtual IEnumerable<Results> Results { get; set; }
        public virtual IEnumerable<Answers> Answers { get; set; }
    }
}
