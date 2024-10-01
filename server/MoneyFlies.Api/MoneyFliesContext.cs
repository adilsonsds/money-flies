using Microsoft.EntityFrameworkCore;
using MoneyFlies.Api.Entities;

class MoneyFliesContext(DbContextOptions<MoneyFliesContext> options) : DbContext(options)
{
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MoneyFliesContext).Assembly);
    }
}