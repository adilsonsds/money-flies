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
    }

    public int Id { get; private set; }
    public string Title { get; private set; }
    public Collection<Transaction> Transactions { get; private set; } = [];
}
