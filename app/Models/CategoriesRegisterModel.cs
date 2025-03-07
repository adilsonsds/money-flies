using app.Data;

namespace app.Models;

public record CategoriesRegisterModel
{
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public List<CategoriesRegisterItemModel> Subcategories { get; set; } = [];

    public CategoriesRegisterModel()
    {
        AddEmptySubcategory();
    }

    public void AddEmptySubcategory()
    {
        Subcategories.Add(new CategoriesRegisterItemModel());
    }

    public record CategoriesRegisterItemModel
    {
        public string Key { get; set; } = Guid.NewGuid().ToString().PadLeft(8, '0');
        public int? Id { get; set; } = null;
        public string Name { get; set; } = "";
        public bool UsedForRevenue { get; set; } = true;
    }
}

public static class CategoriesRegisterModelExtensions
{
    public static Category ToEntity(this CategoriesRegisterModel model)
    {
        var category = new Category
        {
            Name = model.Name,
            Description = model.Description
        };

        foreach (var sbModel in model.Subcategories)
        {
            category.SubCategories.Add(new SubCategory
            {
                Category = category,
                Name = sbModel.Name,
                UsedForRevenue = sbModel.UsedForRevenue
            });
        }

        return category;
    }

    public static void UpdateFromModel(this Category category, CategoriesRegisterModel model, List<int> subcategoriesIdsBeingUsed)
    {
        category.Name = model.Name;
        category.Description = model.Description;

        var subcategoriesToRemove = category.SubCategories.Where(sb => !subcategoriesIdsBeingUsed.Contains(sb.Id) && !model.Subcategories.Any(sbModel => sbModel.Id == sb.Id)).ToList();
        foreach (var subcategoryToRemove in subcategoriesToRemove)
        {
            category.SubCategories.Remove(subcategoryToRemove);
        }

        foreach (var sbModel in model.Subcategories)
        {
            var subcategory = category.SubCategories.SingleOrDefault(sb => sbModel.Id > 0 && sb.Id == sbModel.Id);

            if (subcategory is null)
            {
                subcategory = new SubCategory
                {
                    Category = category,
                    Name = sbModel.Name,
                    UsedForRevenue = sbModel.UsedForRevenue
                };

                category.SubCategories.Add(subcategory);
            }

            subcategory.Name = sbModel.Name;
            subcategory.UsedForRevenue = sbModel.UsedForRevenue;
        }
    }

    public static CategoriesRegisterModel ToModel(this Category category)
    {
        var model = new CategoriesRegisterModel
        {
            Name = category.Name,
            Description = category.Description,
            Subcategories = [.. category.SubCategories.Select(sb => new CategoriesRegisterModel.CategoriesRegisterItemModel
            {
                Id = sb.Id,
                Name = sb.Name,
                UsedForRevenue = sb.UsedForRevenue
            })]
        };

        return model;
    }
}
