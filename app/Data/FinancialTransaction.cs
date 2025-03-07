namespace app.Data;

public class FinancialTransaction
{
    public int Id { get; set; }
    public required Category Category { get; set; }
    public required SubCategory SubCategory { get; set; }
    public required decimal Amount { get; set; }
    public string? Description { get; set; }
    public required DateOnly Date { get; set; }
    public required bool Paid { get; set; }
}