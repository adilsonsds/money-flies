namespace app.Data;

public class FinancialTransaction
{
    public int Id { get; set; }
    public required decimal Amount { get; set; }
    public string Name { get; set; }
    public required DateOnly Date { get; set; }
    public ICollection<FinancialTransactionPayment> Payments { get; set; }
    public ICollection<FinancialTransactionTag> Tags { get; set; }
}
