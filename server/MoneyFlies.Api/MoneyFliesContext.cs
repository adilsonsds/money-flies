using Microsoft.EntityFrameworkCore;

class MoneyFliesContext(DbContextOptions<MoneyFliesContext> options) : DbContext(options)
{
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Category> Categories { get; set; }
}