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

    public Category(string name, string description)
    {
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

    public void AddSubCategory(string name, bool usedForRevenue)
    {
        SubCategories.Add(new SubCategory(this, name, usedForRevenue));
    }

    public void EditOrAddSubCategory(int? id, string name, bool usedForRevenue)
    {
        var subcategory = SubCategories.SingleOrDefault(sb => id > 0 && sb.Id == id);
        if (subcategory is not null)
        {
            subcategory.Edit(name, usedForRevenue);
        }
        else
        {
            AddSubCategory(name, usedForRevenue);
        }
    }

    public void RemoveSubCategory(SubCategory subCategory)
    {
        SubCategories.Remove(subCategory);
    }
}
