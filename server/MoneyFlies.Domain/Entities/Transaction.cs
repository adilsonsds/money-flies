namespace MoneyFlies.Domain.Entities;

public class Transaction : Entity
{
    private Transaction()
    {
    }

    public Transaction(
        decimal amount,
        Category category,
        string description,
        Account from,
        Account to,
        DateOnly date,
        bool paid)
    {
        Amount = amount;
        Category = category;
        Description = description;
        From = from;
        To = to;
        Date = date;
        Paid = paid;
    }

    public int Id { get; private set; }
    public decimal Amount { get; private set; }
    public Category Category { get; private set; }
    public string Description { get; private set; }
    public Account From { get; private set; }
    public Account To { get; private set; }
    public DateOnly Date { get; private set; }
    public bool Paid { get; private set; }

    public void Update(decimal amount, Category category, string description, Account accountFrom, Account accountTo, DateOnly date, bool paid)
    {
        Amount = amount;
        Category = category;
        Description = description;
        From = accountFrom;
        To = accountTo;
        Date = date;
        Paid = paid;
    }
}