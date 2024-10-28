using MoneyFlies.Domain.Entities;

namespace MoneyFlies.Domain.Repositories;

public interface IRepository<TEntity> where TEntity : Entity
{
    Task<TEntity?> GetByIdAsync(int id);
    Task<List<TEntity>> ListAsync();
    Task<TEntity> AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(TEntity entity);
}
