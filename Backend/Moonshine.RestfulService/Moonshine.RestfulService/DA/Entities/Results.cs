using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moonshine.RestfulService.DA.Entities
{
    public  class Results
    {
        public Guid Id { get; set; }
        public Guid QuestionId { get; set; }
        public string SelectedResult { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey(nameof(QuestionId))]
        public virtual Questions Question { get; set; }
    }
}
