using Microsoft.EntityFrameworkCore;
using MoneyFlies.Domain.Entities;
using MoneyFlies.Domain.Repositories;
using MoneyFlies.Domain.Repositories.DTO;

namespace MoneyFlies.Infra.Repositories;

internal class TransactionRepository(MoneyFliesContext context) : Repository<Transaction>(context), ITransactionRepository
{
    public async Task<List<TransactionDTO>> ListPagedAsync(TransactionsFilter filter)
    {
        var transactions = _entities.AsQueryable();

        if (filter.Year > 0)
        {
            transactions = transactions.Where(t => t.Date.Year == filter.Year);
        }

        if (filter.Month > 0)
        {
            transactions = transactions.Where(t => t.Date.Month == filter.Month);
        }

        if (filter.CategoryId.HasValue)
        {
            transactions = transactions.Where(t => t.Category.Id == filter.CategoryId.Value);
        }

        var result = await transactions
            .OrderByDescending(t => t.Id)
            .Skip((filter.Page - 1) * filter.PageSize).Take(filter.PageSize)
            .Select(t => new TransactionDTO(t))
            .ToListAsync();

        return result;
    }

    public async Task<List<SummaryDTO>> ListSummaryAsync()
    {
        var result = await _entities
            .GroupBy(t => new { t.Date.Year, t.Date.Month, t.Category.Id })
            .Select(g => new SummaryDTO
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                Category = new SummaryDTO.CategorySummaryDTO
                {
                    Id = g.Key.Id,
                    Name = g.First().Category.Name
                },
                TotalAmount = g.Sum(t => t.Amount)
            })
            .ToListAsync();

        return result;
    }
}