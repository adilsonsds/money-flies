namespace MoneyFlies.Api.Entities;

public class Payer
{
    private Payer()
    {

    }

    public Payer(string name)
    {
        Name = name;
    }

    public int Id { get; private set; }
    public string Name { get; private set; }
}