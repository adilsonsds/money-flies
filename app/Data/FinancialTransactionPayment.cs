namespace app.Data;

public class FinancialTransactionPayment
{
    public int Id { get; set; }
    public FinancialTransaction FinancialTransaction { get; set; }
    public required decimal Value { get; set; }
    public required DateOnly Date { get; set; }
    public required bool Paid { get; set; }
    public string? Observation { get; set; }
}