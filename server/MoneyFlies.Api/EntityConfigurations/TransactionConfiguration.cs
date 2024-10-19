using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoneyFlies.Api.Entities;

namespace MoneyFlies.Api.EntityConfigurations;

public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
       public void Configure(EntityTypeBuilder<Transaction> builder)
       {
              builder.ToTable("transactions", "act");

              builder.HasKey(t => t.Id);

              builder.Property(t => t.Id)
                     .HasColumnName("id")
                     .IsRequired();

              builder.Property(t => t.Amount)
                     .HasColumnName("amount")
                     .HasColumnType("decimal(10, 2)")
                     .IsRequired();

              builder.Property(t => t.Paid)
                     .HasColumnName("paid")
                     .IsRequired();

              builder.Property(t => t.Date)
                     .HasColumnName("date")
                     .IsRequired();

              builder.Property(t => t.Description)
                     .HasColumnName("description")
                     .HasMaxLength(100)
                     .IsRequired();

              builder.HasOne(t => t.Activity)
                      .WithMany(p => p.Transactions)
                      .HasForeignKey("activity_id")
                      .IsRequired();

              builder.HasOne(t => t.Category)
                      .WithMany()
                      .HasForeignKey("category_id")
                      .IsRequired();

              builder.HasOne(t => t.Payer)
                     .WithMany()
                     .HasForeignKey("payer_id")
                     .IsRequired();

       }
}


