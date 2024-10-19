using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoneyFlies.Api.Entities;

namespace MoneyFlies.Api.EntityConfigurations;

public class PayerConfiguration : IEntityTypeConfiguration<Payer>
{
    public void Configure(EntityTypeBuilder<Payer> builder)
    {
        builder.ToTable("payers", "act");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id)
                .HasColumnName("id")
                .IsRequired();

        builder.Property(p => p.Name)
                .HasColumnName("name")
                .IsRequired();

    }
}