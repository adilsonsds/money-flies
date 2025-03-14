namespace app.Data;

public class FinancialTransactionPayment
{
    public int Id { get; set; }
    public FinancialTransaction FinancialTransaction { get; set; }
    public decimal Value { get; set; }
    public DateOnly Date { get; set; }
    public bool Paid { get; set; }
    public string? Observation { get; set; }
}