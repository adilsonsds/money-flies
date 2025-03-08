using Microsoft.EntityFrameworkCore;

namespace app.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Tag> Tags { get; set; }
    public DbSet<TagValue> TagValues { get; set; }
    public DbSet<FinancialTransaction> FinancialTransactions { get; set; }
    public DbSet<FinancialTransactionPayment> FinancialTransactionPayments { get; set; }
    public DbSet<FinancialTransactionTag> FinancialTransactionTags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.HasMany(e => e.Values).WithOne(g => g.Tag).HasForeignKey("TagId");

            entity.HasData(InitialData.Tags);
        });

        modelBuilder.Entity<TagValue>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Value).IsRequired().HasMaxLength(50);
            entity.HasOne(e => e.Tag).WithMany(g => g.Values).HasForeignKey("TagId");

            entity.HasData(InitialData.TagValues);
        });

        modelBuilder.Entity<FinancialTransaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).IsRequired();
            entity.Property(e => e.Date).IsRequired();
            entity.Property(e => e.Name).HasMaxLength(280).IsRequired();
        });

        modelBuilder.Entity<FinancialTransactionPayment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Value).IsRequired();
            entity.Property(e => e.Observation).IsRequired(false);
            entity.Property(e => e.Date).IsRequired();
            entity.Property(e => e.Paid).IsRequired();
            entity.HasOne(e => e.FinancialTransaction).WithMany(g => g.Payments).HasForeignKey("FinancialTransactionId");
        });

        modelBuilder.Entity<FinancialTransactionTag>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.FinancialTransaction).WithMany(g => g.Tags).HasForeignKey("FinancialTransactionId");
            entity.HasOne(e => e.Tag).WithMany().HasForeignKey("TagId");
            entity.HasOne(e => e.TagValue).WithMany().HasForeignKey("TagValueId");
        });
    }
}
