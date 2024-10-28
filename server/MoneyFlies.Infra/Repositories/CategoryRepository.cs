using MoneyFlies.Domain.Entities;
using MoneyFlies.Domain.Repositories;

namespace MoneyFlies.Infra.Repositories;

internal class CategoryRepository(MoneyFliesContext context) : Repository<Category>(context), ICategoryRepository
{
}
