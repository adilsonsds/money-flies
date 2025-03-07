using Microsoft.EntityFrameworkCore;

namespace app.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Category> Categories { get; set; }
    public DbSet<FinancialTransaction> FinancialTransactions { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(280);
            entity.HasMany(e => e.SubCategories).WithOne(g => g.Category).HasForeignKey(e => e.CategoryId);

            entity.HasData(InitialData.Categories);
        });

        modelBuilder.Entity<SubCategory>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.CategoryId).IsRequired();
            entity.Property(e => e.UsedForRevenue).IsRequired();
            entity.HasOne(e => e.Category).WithMany(g => g.SubCategories).HasForeignKey(e => e.CategoryId);

            entity.HasData(InitialData.SubCategories);
        });

        modelBuilder.Entity<FinancialTransaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).IsRequired();
            entity.Property(e => e.Date).IsRequired();
            entity.HasOne(e => e.Category).WithMany().HasForeignKey("CategoryId");
            entity.HasOne(e => e.SubCategory).WithMany().HasForeignKey("SubCategoryId");
            entity.Property(e => e.Description).HasMaxLength(280).IsRequired(false);
            entity.Property(e => e.Paid).IsRequired();
        });
    }
}
