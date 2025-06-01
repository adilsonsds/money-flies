using Microsoft.EntityFrameworkCore;

namespace app.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<TagValue> TagValues { get; set; }
    public DbSet<FinancialTransactionBatch> FinancialTransactionBatches { get; set; }
    public DbSet<FinancialTransaction> FinancialTransactions { get; set; }
    public DbSet<FinancialTransactionTag> FinancialTransactionTags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Profile>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.HasData(InitialData.Profiles);
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.HasMany(e => e.Values).WithOne(g => g.Tag).OnDelete(DeleteBehavior.Cascade).HasForeignKey("TagId");
            entity.HasOne(e => e.Profile).WithMany().HasForeignKey(e => e.ProfileId).IsRequired();

            entity.HasData(InitialData.Tags);
        });

        modelBuilder.Entity<TagValue>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Value).IsRequired().HasMaxLength(50);
            entity.HasOne(e => e.Tag).WithMany(g => g.Values).HasForeignKey(e => e.TagId);

            entity.HasData(InitialData.TagValues);
        });

        modelBuilder.Entity<FinancialTransactionBatch>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.HasMany(e => e.Transactions).WithOne(g => g.Batch).OnDelete(DeleteBehavior.Cascade).HasForeignKey("BatchId");
            entity.HasOne(e => e.Profile).WithMany().HasForeignKey("ProfileId").IsRequired();
        });

        modelBuilder.Entity<FinancialTransaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Observation).IsRequired(false);
            entity.Property(e => e.IssueDate).IsRequired(false);
            entity.Property(e => e.DueDate).IsRequired(false);
            entity.Property(e => e.PaymentDate).IsRequired(false);
            entity.Property(e => e.Value).IsRequired();
            entity.Property(e => e.Status).IsRequired();
            entity.HasOne(e => e.Batch).WithMany(g => g.Transactions).HasForeignKey("BatchId");
            entity.HasMany(e => e.Tags).WithOne(g => g.FinancialTransaction).OnDelete(DeleteBehavior.Cascade).HasForeignKey("FinancialTransactionId");
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
