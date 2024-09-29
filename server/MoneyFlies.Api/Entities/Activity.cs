using System.Collections.ObjectModel;

class Activity(string title)
{
    public int Id { get; private set; }
    public string Title { get; private set; } = title;
    public Collection<Transaction> Transactions { get; private set; } = [];
}
