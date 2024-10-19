using System.Collections.ObjectModel;

namespace MoneyFlies.Api.Entities;

public class Activity
{
    private Activity()
    {

    }

    public Activity(string title, DateOnly date)
    {
        Title = title;
        Date = date;
        TotalAmount = 0;
        Transactions = [];
    }

    public int Id { get; private set; }
    public string Title { get; private set; }
    public DateOnly Date { get; private set; }
    public decimal TotalAmount { get; private set; }
    public Collection<Transaction> Transactions { get; private set; } = [];

    public Transaction AddTransaction(
        Category category, string description, decimal amount, bool paid, DateOnly date, Payer payer)
    {
        Transaction transaction = new(this, category, description, amount, paid, date, payer);
        Transactions.Add(transaction);
        TotalAmount += amount;
        return transaction;
    }

    public Transaction UpdateTransaction(
        int transactionId, Category category, string description, decimal amount, bool paid, DateOnly date, Payer payer)
    {
        Transaction? transaction = Transactions.SingleOrDefault(t => t.Id == transactionId) ?? throw new ArgumentException("Transaction not found");
        TotalAmount -= transaction.Amount;
        TotalAmount += amount;

        transaction.Update(category, description, amount, paid, date, payer);

        return transaction;
    }

    public void RemoveTransaction(Transaction transaction)
    {
        Transactions.Remove(transaction);
        TotalAmount -= transaction.Amount;
    }
}
