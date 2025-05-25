namespace app.Data;

public class Profile
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class FinancialTransactionBatch
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Profile Profile { get; set; }
    public ICollection<FinancialTransaction> Transactions { get; set; } = [];
}

public class FinancialTransaction
{
    public int Id { get; set; }
    public FinancialTransactionBatch Batch { get; set; }
    public DateOnly? EmissionDate { get; set; }
    public DateOnly? DueDate { get; set; }
    public DateOnly? TransactionDate { get; set; }
    public string? Observation { get; set; }
    public decimal Value { get; set; }
    public bool IsEntry { get; set; }
    public FinancialTransactionStatus Status { get; set; }
    public ICollection<FinancialTransactionTag> Tags { get; set; } = [];
}

public enum FinancialTransactionStatus
{
    Pending = 0,
    Paid = 1
}

public class FinancialTransactionTag
{
    public int Id { get; set; }
    public FinancialTransaction FinancialTransaction { get; set; }
    public Tag Tag { get; set; }
    public TagValue TagValue { get; set; }
}