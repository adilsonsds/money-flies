namespace MoneyFlies.Web.Models;

public class Transaction
{
    public Transaction()
    {
    }

    public Transaction(TransactionType type, DateOnly paymentDate, decimal value, bool isPaid, string? description, params string[] tags)
    {
        Type = type;
        PaymentDate = paymentDate;
        Value = value;
        IsPaid = isPaid;
        Description = description;
        Tags = tags.Select(t => new TransactionTag { Name = t }).ToList();
    }
    
    public TransactionType Type { get; set; }
    public DateOnly PaymentDate { get; set; }
    public decimal Value { get; set; }
    public bool IsPaid { get; set; }
    public string? Description { get; set; }
    public ICollection<TransactionTag> Tags { get; set; }

    public string GetTagsDescriptions() => string.Join(", ", Tags.Select(t => t.Name).ToList());
}
