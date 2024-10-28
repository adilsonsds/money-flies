using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoneyFlies.Domain.Entities;

namespace MoneyFlies.Infra.EntityConfigurations;

public class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.ToTable("accounts", "act");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
               .HasColumnName("id")
               .IsRequired();

        builder.Property(a => a.Name)
               .HasColumnName("name")
               .IsRequired();
    }
}