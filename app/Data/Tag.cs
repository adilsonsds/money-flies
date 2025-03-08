namespace app.Data;

public class Tag
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection<TagValue> Values { get; set; } = [];
}
