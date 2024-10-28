using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoneyFlies.Domain.Entities;

namespace MoneyFlies.Infra.EntityConfigurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("categories", "act");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Id)
               .HasColumnName("id")
               .IsRequired();

        builder.Property(c => c.Name)
               .HasColumnName("name")
               .IsRequired();
    }
}
