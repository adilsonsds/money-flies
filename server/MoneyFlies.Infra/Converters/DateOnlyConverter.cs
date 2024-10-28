using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MoneyFlies.Infra.Converters;

class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
{
    public DateOnlyConverter() : base(
        date => date.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc),
        dateTime => DateOnly.FromDateTime(DateTime.SpecifyKind(dateTime, DateTimeKind.Utc))
    )
    {
    }
}