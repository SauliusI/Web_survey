using Microsoft.EntityFrameworkCore;
using Moonshine.RestfulService.DA.Entities;

namespace Moonshine.RestfulService.DA.Contracts
{
    public interface IUnitOfWork
    {
        int SaveChanges();
        DbSet<Survey> Survey { get; }
        DbSet<Answers> Answer { get; }
        DbSet<Questions> Question { get; }
        DbSet<Results> Result { get; }
    }
}
