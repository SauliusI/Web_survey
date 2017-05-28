using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moonshine.RestfulService.DA.Entities
{
    public class Answers
    {
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }
        public int OptionNumber { get; set; }
        public string OptionName { get; set; }
        [ForeignKey(nameof(QuestionId))]
        public virtual Questions Question { get; set; }
    }
}
