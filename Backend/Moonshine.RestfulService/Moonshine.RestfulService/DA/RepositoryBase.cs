using Moonshine.RestfulService.DA.Contracts;


namespace Moonshine.RestfulService.DA
{
    public abstract class RepositoryBase
    {
        public RepositoryBase(IUnitOfWork dbContext)
        {
            Context = dbContext;
        }
        public IUnitOfWork Context { get; }
    }
}
