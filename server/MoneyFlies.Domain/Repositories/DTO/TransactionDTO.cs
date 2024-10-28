namespace MoneyFlies.Domain.Repositories.DTO;

public class TransactionDTO
{
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
