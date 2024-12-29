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

        if (filter.AccountId.HasValue)
        {
            transactions = transactions.Where(t => t.From.Id == filter.AccountId.Value || t.To.Id == filter.AccountId.Value);
        }

        if (!string.IsNullOrWhiteSpace(filter.ContentText))
        {
            var contentTextLower = filter.ContentText.ToLower();

            transactions = transactions.Where(t =>
                t.Description.ToLower().Contains(contentTextLower) ||
                t.Category.Name.ToLower().Contains(contentTextLower) ||
                t.From.Name.ToLower().Contains(contentTextLower) ||
                t.To.Name.ToLower().Contains(contentTextLower));
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
            .GroupBy(t => new
            {
                t.Date.Year,
                t.Date.Month,
                CategoryId = t.Category.Id,
                AccountFromId = t.From.Id,
                AccountToId = t.To.Id,
                CategoryName = t.Category.Name,
                AccountFromName = t.From.Name,
                AccountToName = t.To.Name
            })
            .Select(g => new SummaryDTO(
                g.Key.Year,
                g.Key.Month,
                new CategorySummaryDTO(g.Key.CategoryId, g.Key.CategoryName),
                new AccountSummaryDTO(g.Key.AccountFromId, g.Key.AccountFromName),
                new AccountSummaryDTO(g.Key.AccountToId, g.Key.AccountToName),
                g.Sum(t => t.Amount)
            ))
            .ToListAsync();

        return result;
    }
}