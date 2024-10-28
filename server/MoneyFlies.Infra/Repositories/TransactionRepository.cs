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
            .Select(g => new TransactionDTO
            {
                Id = g.Id,
                Category = new TransactionDTO.CategoryTransactionDTO
                {
                    Id = g.Category.Id,
                    Name = g.Category.Name
                },
                AccountFrom = new TransactionDTO.AccountTransactionDTO
                {
                    Id = g.From.Id,
                    Name = g.From.Name
                },
                AccountTo = new TransactionDTO.AccountTransactionDTO
                {
                    Id = g.To.Id,
                    Name = g.To.Name
                },
                Description = g.Description,
                Amount = g.Amount,
                Paid = g.Paid,
                Date = g.Date
            })
            .OrderByDescending(t => t.Id)
            .Skip((filter.Page - 1) * filter.PageSize).Take(filter.PageSize)
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