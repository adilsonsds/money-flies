using app.Data;

namespace app.Models;

public record CreateCategoryModel
{
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public List<CreateSubcategoryModel> Subcategories { get; set; } = [];

    public CreateCategoryModel()
    {
        AddEmptySubcategory();
    }

    public void AddEmptySubcategory()
    {
        Subcategories.Add(new CreateSubcategoryModel());
    }

    public record CreateSubcategoryModel
    {
        public string Key { get; set; } = Guid.NewGuid().ToString().PadLeft(8, '0');
        public int? Id { get; set; } = null;
        public string Name { get; set; } = "";
        public bool UsedForRevenue { get; set; } = true;
    }
}

public static class CreateCategoryModelExtensions
{
    public static Category ToEntity(this CreateCategoryModel model)
    {
        var category = new Category(model.Name, model.Description);

        foreach (var sbModel in model.Subcategories)
        {
            category.AddSubCategory(sbModel.Name, sbModel.UsedForRevenue);
        }

        return category;
    }

    public static void UpdateFromModel(this Category category, CreateCategoryModel model, List<int> subcategoriesIdsBeingUsed)
    {
        category.Name = model.Name;
        category.Description = model.Description;

        var subcategoriesToRemove = category.SubCategories.Where(sb => !subcategoriesIdsBeingUsed.Contains(sb.Id) && !model.Subcategories.Any(sbModel => sbModel.Id == sb.Id)).ToList();
        foreach (var subcategory in subcategoriesToRemove)
        {
            category.RemoveSubCategory(subcategory);
        }

        foreach (var sbModel in model.Subcategories)
        {
            category.EditOrAddSubCategory(sbModel.Id, sbModel.Name, sbModel.UsedForRevenue);
        }
    }

    public static CreateCategoryModel ToModel(this Category category)
    {
        var model = new CreateCategoryModel
        {
            Name = category.Name,
            Description = category.Description,
            Subcategories = [.. category.SubCategories.Select(sb => new CreateCategoryModel.CreateSubcategoryModel
            {
                Id = sb.Id,
                Name = sb.Name,
                UsedForRevenue = sb.UsedForRevenue
            })]
        };

        return model;
    }
}
