namespace app.Data;

public class FinancialTransactionTag
{
    public int Id { get; set; }
    public FinancialTransaction FinancialTransaction { get; set; }
    public Tag Tag { get; set; }
    public TagValue TagValue { get; set; }
}
