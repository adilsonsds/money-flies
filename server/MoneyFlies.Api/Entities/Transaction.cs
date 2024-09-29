class Transaction(Activity activity, string description, decimal amount, DateOnly date, Category category)
{
    public int Id { get; private set; }
    public Activity Activity { get; private set; } = activity;
    public string Description { get; private set; } = description;
    public decimal Amount { get; private set; } = amount;
    public DateOnly Date { get; private set; } = date;
    public Category Category { get; private set; } = category;
}
