using Microsoft.EntityFrameworkCore;
using MoneyFlies.Infra.Converters;

namespace MoneyFlies.Infra;

public class MoneyFliesContext(DbContextOptions<MoneyFliesContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MoneyFliesContext).Assembly);
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<DateOnly>().HaveConversion<DateOnlyConverter>();
    }
}
