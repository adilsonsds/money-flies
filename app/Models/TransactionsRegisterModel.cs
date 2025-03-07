using app.Data;

namespace app.Models;

public record TransactionsRegisterModel
{
    public int SubCategoryId { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }
    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    public bool Paid { get; set; }
}

public static class TransactionsRegisterModelExtensions
{
    public static FinancialTransaction ToEntity(this TransactionsRegisterModel model, SubCategory subCategory)
    {
        return new FinancialTransaction
        {
            SubCategory = subCategory,
            Category = subCategory.Category,
            Amount = model.Amount,
            Description = model.Description,
            Date = model.Date,
            Paid = model.Paid
        };
    }

    public static void UpdateFromModel(this FinancialTransaction transaction, TransactionsRegisterModel model, SubCategory subCategory)
    {
        transaction.SubCategory = subCategory;
        transaction.Category = subCategory.Category;
        transaction.Amount = model.Amount;
        transaction.Description = model.Description;
        transaction.Date = model.Date;
        transaction.Paid = model.Paid;
    }

    public static TransactionsRegisterModel ToModel(this FinancialTransaction transaction)
    {
        return new TransactionsRegisterModel
        {
            SubCategoryId = transaction.SubCategory.Id,
            Amount = transaction.Amount,
            Description = transaction.Description,
            Date = transaction.Date,
            Paid = transaction.Paid
        };
    }
}