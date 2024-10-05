using System.Collections.ObjectModel;

namespace MoneyFlies.Api.Entities;

public class Activity
{
    private Activity()
    {

    }

    public Activity(string title)
    {
        Title = title;
        Transactions = [];
    }

    public int Id { get; private set; }
    public string Title { get; private set; }
    public Collection<Transaction> Transactions { get; private set; } = [];

    public Transaction AddTransaction(Category category, string description, decimal amount, bool paid, DateOnly date)
    {
        Transaction transaction = new Transaction(this, category, description, amount, paid, date);
        Transactions.Add(transaction);
        return transaction;
    }
}
