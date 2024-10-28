using MoneyFlies.Domain.Entities;
using MoneyFlies.Domain.Repositories.DTO;

namespace MoneyFlies.Domain.Repositories;

public interface ITransactionRepository : IRepository<Transaction>
{
    Task<List<TransactionDTO>> ListPagedAsync(TransactionsFilter filter);
    Task<List<SummaryDTO>> ListSummaryAsync();
}
