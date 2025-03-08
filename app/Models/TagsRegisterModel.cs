using app.Data;

namespace app.Models;

public record TagsRegisterModel
{
    public string Name { get; set; } = string.Empty;
    public ICollection<TagsRegisterItemModel> Values { get; set; } = [];

    public TagsRegisterModel()
    {
        AddEmptyValue();
    }

    public void AddEmptyValue()
    {
        Values.Add(new TagsRegisterItemModel());
    }

    public record TagsRegisterItemModel
    {
        public string Key { get; set; } = Guid.NewGuid().ToString().PadLeft(8, '0');
        public int? Id { get; set; } = null;
        public string Value { get; set; } = string.Empty;
    }
}

public static class TagsRegisterModelExtensions
{
    public static Tag ToEntity(this TagsRegisterModel model)
    {
        var entity = new Tag
        {
            Name = model.Name
        };

        foreach (var valueModel in model.Values)
        {
            entity.Values.Add(new TagValue
            {
                Tag = entity,
                Value = valueModel.Value
            });
        }

        return entity;
    }

    public static void UpdateFromModel(this Tag entity, TagsRegisterModel model, ICollection<int> valuesIdsBeingUsed)
    {
        entity.Name = model.Name;

        var valuesToRemove = entity.Values.Where(sb => !valuesIdsBeingUsed.Contains(sb.Id) && !model.Values.Any(sbModel => sbModel.Id == sb.Id)).ToList();
        foreach (var valueToRemove in valuesToRemove)
        {
            entity.Values.Remove(valueToRemove);
        }

        foreach (var sbModel in model.Values)
        {
            var valueEntity = entity.Values.SingleOrDefault(sb => sbModel.Id > 0 && sb.Id == sbModel.Id);

            if (valueEntity is null)
            {
                valueEntity = new TagValue
                {
                    Tag = entity
                };

                entity.Values.Add(valueEntity);
            }

            valueEntity.Value = sbModel.Value;
        }
    }

    public static TagsRegisterModel ToModel(this Tag entity)
    {
        var model = new TagsRegisterModel
        {
            Name = entity.Name,
            Values = [.. entity.Values.Select(sb => new TagsRegisterModel.TagsRegisterItemModel
            {
                Id = sb.Id,
                Value = sb.Value
            })]
        };

        return model;
    }
}
