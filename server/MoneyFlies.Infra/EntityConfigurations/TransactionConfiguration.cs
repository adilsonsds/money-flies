using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoneyFlies.Domain.Entities;

namespace MoneyFlies.Infra.EntityConfigurations;

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

              builder.HasOne(t => t.Category)
                      .WithMany()
                      .HasForeignKey("category_id")
                      .IsRequired();

              builder.HasOne(t => t.From)
                     .WithMany()
                     .HasForeignKey("account_id_from")
                     .IsRequired();

              builder.HasOne(t => t.To)
                     .WithMany()
                     .HasForeignKey("account_id_to")
                     .IsRequired();

              builder.Navigation(t => t.Category).AutoInclude();
              builder.Navigation(t => t.From).AutoInclude();
              builder.Navigation(t => t.To).AutoInclude();
       }
}


