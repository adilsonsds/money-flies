using MoneyFlies.Domain.Entities;

namespace MoneyFlies.Domain.Repositories.DTO;

public class TransactionDTO
{
    public TransactionDTO(Transaction transaction)
    {
        Id = transaction.Id;
        Category = new CategoryTransactionDTO
        {
            Id = transaction.Category.Id,
            Name = transaction.Category.Name
        };
        AccountFrom = new AccountTransactionDTO
        {
            Id = transaction.From.Id,
            Name = transaction.From.Name
        };
        AccountTo = new AccountTransactionDTO
        {
            Id = transaction.To.Id,
            Name = transaction.To.Name
        };
        Description = transaction.Description;
        Amount = transaction.Amount;
        Paid = transaction.Paid;
        Date = transaction.Date;
    }

    public int Id { get; set; }
    public CategoryTransactionDTO Category { get; set; }
    public ActivityTransactionDTO Activity { get; set; }
    public AccountTransactionDTO AccountFrom { get; set; }
    public AccountTransactionDTO AccountTo { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; }
    public bool Paid { get; set; }
    public DateOnly Date { get; set; }

    public class CategoryTransactionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ActivityTransactionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class AccountTransactionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
