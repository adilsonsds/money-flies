namespace MoneyFlies.Api.Entities;

public class Category
{
    private Category()
    {

    }

    public Category(string name)
    {
        Name = name;
    }

    public int Id { get; private set; }
    public string Name { get; private set; }
}