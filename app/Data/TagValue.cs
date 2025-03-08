namespace app.Data;

public class TagValue
{
    public int Id { get; set; }
    public int TagId { get; set; }
    public Tag Tag { get; set; }
    public string Value { get; set; }
}