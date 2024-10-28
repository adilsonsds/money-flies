namespace MoneyFlies.Domain.Entities;

public class Account : Entity
{
    public int Id { get; private set; }
    public string Name { get; private set; }

    public Account(string name)
    {
        Name = name;
    }

    private Account()
    {

    }
}

