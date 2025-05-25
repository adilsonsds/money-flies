namespace app.Data;

public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ProfileId { get; set; }
    public Profile Profile { get; set; }
    public ICollection<TagValue> Values { get; set; } = [];
}
