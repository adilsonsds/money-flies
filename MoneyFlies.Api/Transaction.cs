namespace MoneyFlies.Api;

class Transaction
{
    public Transaction(DateOnly paymentDate, string category, decimal value, bool isPaid, string? description)
    {
        Id = Guid.NewGuid();
        PaymentDate = paymentDate;
        Category = category;
        Value = value;
        IsPaid = isPaid;
        Description = description;
    }

    public Guid Id { get; private set; }
    public DateOnly PaymentDate { get; private set; }
    public string Category { get; private set; }
    public decimal Value { get; private set; }
    public bool IsPaid { get; private set; }
    public string? Description { get; private set; }
}
