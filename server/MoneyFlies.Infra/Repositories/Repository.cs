using Microsoft.EntityFrameworkCore;
using MoneyFlies.Domain.Entities;
using MoneyFlies.Domain.Repositories;

namespace MoneyFlies.Infra.Repositories;

internal class Repository<TEntity>(MoneyFliesContext context) : IRepository<TEntity>
    where TEntity : Entity
{
    protected readonly MoneyFliesContext _context = context;
    protected readonly DbSet<TEntity> _entities = context.Set<TEntity>();

    public async Task<TEntity> AddAsync(TEntity entity)
    {
        await _entities.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(TEntity entity)
    {
        _entities.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<TEntity?> GetByIdAsync(int id) =>
        await _entities.FindAsync(id);

    public async Task<List<TEntity>> ListAsync() =>
        await _entities.ToListAsync();

    public async Task UpdateAsync(TEntity entity)
    {
        _entities.Update(entity);
        await _context.SaveChangesAsync();
    }
}
