using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace Moonshine.RestfulService.DA.Entities
{
    public  class User : IdentityUser<Guid>
    {
        public virtual IEnumerable<Survey> Surveys { get; set; }
    }
}
