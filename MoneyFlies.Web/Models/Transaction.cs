namespace MoneyFlies.Web.Models;

public class Transaction
{
    public Transaction()
    {
    }

    public Transaction(TransactionType type, DateOnly paymentDate, decimal value, bool wasPaid, string? description, params string[] tags)
    {
        Type = type;
        PaymentDate = paymentDate;
        Value = value;
        WasPaid = wasPaid;
        Description = description;
        // Tags = tags.Select(t => new TransactionTag { Name = t }).ToList();
    }
    
    public int? Id { get; set; }
    public TransactionType Type { get; set; }
    public DateOnly PaymentDate { get; set; }
    public decimal Value { get; set; }
    public bool WasPaid { get; set; }
    public string? Description { get; set; }
    // public ICollection<TransactionTag> Tags { get; set; }

    public string GetTagsDescriptions() => "Teste";// string.Join(", ", Tags.Select(t => t.Name).ToList());
}
