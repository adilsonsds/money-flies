namespace app.Data;

public class SubCategory
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
    public required bool UsedForRevenue { get; set; }
}
