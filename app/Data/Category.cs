namespace app.Data;

public class Category
{
    public Category(int id, string name, string description)
    {
        Id = id;
        Name = name;
        Description = description;
        SubCategories = [];
    }

    private Category()
    {
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<SubCategory> SubCategories { get; set; }
}
