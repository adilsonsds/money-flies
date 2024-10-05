namespace MoneyFlies.Api.Entities;

public class Transaction
{
    private Transaction()
    {

    }
    public Transaction(Activity activity, Category category, string description, decimal amount, bool paid, DateOnly date)
    {
        Activity = activity;
        Category = category;
        Description = description;
        Amount = amount;
        Paid = paid;
        Date = date;
    }

    public int Id { get; private set; }
    public Activity Activity { get; private set; }
    public Category Category { get; private set; }
    public string Description { get; private set; }
    public decimal Amount { get; private set; }
    public bool Paid { get; private set; }
    public DateOnly Date { get; private set; }


    public void Update(Category category, string description, decimal amount, bool paid, DateOnly date)
    {
        Category = category;
        Description = description;
        Amount = amount;
        Paid = paid;
        Date = date;
    }
}
