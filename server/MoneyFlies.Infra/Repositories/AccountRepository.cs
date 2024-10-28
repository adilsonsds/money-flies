using MoneyFlies.Domain.Entities;
using MoneyFlies.Domain.Repositories;

namespace MoneyFlies.Infra.Repositories;

internal class AccountRepository(MoneyFliesContext context) : Repository<Account>(context), IAccountRepository
{
}