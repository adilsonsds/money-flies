namespace MoneyFlies.Domain.Entities;

public class Category : Entity
{
    public Category(string name)
    {
        Name = name;
    }

    private Category()
    {
    }

    public int Id { get; private set; }
    public string Name { get; private set; }
}

