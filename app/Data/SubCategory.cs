namespace app.Data;

public class SubCategory
{

    public SubCategory(int categoryId, int id, string name, bool usedForRevenue)
    {
        CategoryId = categoryId;
        Id = id;
        Name = name;
        UsedForRevenue = usedForRevenue;
    }

    public SubCategory(Category category, string name, bool usedForRevenue)
    {
        Category = category;
        Name = name;
        UsedForRevenue = usedForRevenue;
    }

    private SubCategory()
    {
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
    public bool UsedForRevenue { get; set; }

    public void Edit(string name, bool usedForRevenue)
    {
        Name = name;
        UsedForRevenue = usedForRevenue;
    }
}
