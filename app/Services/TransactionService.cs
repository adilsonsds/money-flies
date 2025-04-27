using app.Data;
using app.Models;
using Microsoft.EntityFrameworkCore;

namespace app.Services;

public class TransactionService
{
    private readonly AppDbContext _dbContext;

    public TransactionService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<FinancialTransactionPayment>> LoadTransactions(TransactionFilter filter)
    {
        var query = _dbContext.FinancialTransactionPayments.Include(p => p.FinancialTransaction).AsQueryable();

        if (filter.StartDate.HasValue)
        {
            if (filter.SelectedDateType == "payment")
            {
                query = query.Where(p => p.Date >= DateOnly.FromDateTime(filter.StartDate.Value));
            }
            else
            {
                query = query.Where(p => p.FinancialTransaction.Date >= DateOnly.FromDateTime(filter.StartDate.Value));
            }
        }

        if (filter.EndDate.HasValue)
        {
            if (filter.SelectedDateType == "payment")
            {
                query = query.Where(p => p.Date <= DateOnly.FromDateTime(filter.EndDate.Value));
            }
            else
            {
                query = query.Where(p => p.FinancialTransaction.Date <= DateOnly.FromDateTime(filter.EndDate.Value));
            }
        }

        if (filter.SelectedTagValueIds.Any())
        {
            query = query.Where(p => p.FinancialTransaction.Tags.Any(t => filter.SelectedTagValueIds.Contains(t.TagValue.Id)));
        }

        if (filter.SelectedDateType == "payment")
        {
            query = query.OrderByDescending(p => p.Date).ThenByDescending(p => p.FinancialTransaction.Date);
        }
        else
        {
            query = query.OrderByDescending(p => p.FinancialTransaction.Date).ThenByDescending(p => p.Date);
        }

        return await query.ToListAsync();
    }

    public async Task UpdateTransactionPaymentStatus(FinancialTransactionPayment transactionPayment)
    {
        var existingPayment = await _dbContext.FinancialTransactionPayments
            .FirstOrDefaultAsync(tp => tp.Id == transactionPayment.Id);

        if (existingPayment != null)
        {
            existingPayment.Paid = transactionPayment.Paid;
            await _dbContext.SaveChangesAsync();
        }
    }
}