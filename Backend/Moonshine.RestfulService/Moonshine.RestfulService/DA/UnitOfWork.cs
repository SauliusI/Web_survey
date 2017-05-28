using Microsoft.EntityFrameworkCore;
using Moonshine.RestfulService.DA.Contracts;
using Moonshine.RestfulService.DA.Entities;

namespace Moonshine.RestfulService.DA
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(AppDbContext dbContext)
        {
            DbContext = dbContext;
        }

        private AppDbContext DbContext { get; }

        public int SaveChanges()
        {
            return DbContext.SaveChanges();
        }

        public DbSet<Survey> Survey { get { return DbContext.Set<Survey>(); } }
        public DbSet<Answers> Answer { get { return DbContext.Set<Answers>(); } }
        public DbSet<Questions> Question { get { return DbContext.Set<Questions>(); } }
        public DbSet<Results> Result { get { return DbContext.Set<Results>(); } }
        public DbSet<User> User { get { return DbContext.Set<User>(); } }
    }
}
