namespace app.Data;

public class FinancialTransaction
{
    private FinancialTransaction()
    {
    }

    public FinancialTransaction(
        SubCategory subCategory,
        decimal amount,
        string description,
        DateOnly date,
        bool paid)
    {
        SubCategory = subCategory;
        Category = subCategory.Category;
        Amount = amount;
        Description = description;
        Date = date;
        Paid = paid;
    }

    public int Id { get; set; }
    public required Category Category { get; set; }
    public required SubCategory SubCategory { get; set; }
    public decimal Amount { get; set; }
    public required string Description { get; set; }
    public DateOnly Date { get; set; }
    public bool Paid { get; set; }
}