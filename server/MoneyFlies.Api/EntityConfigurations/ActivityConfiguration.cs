using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoneyFlies.Api.Entities;

namespace MoneyFlies.Api.EntityConfigurations;

public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
{
        public void Configure(EntityTypeBuilder<Activity> builder)
        {
                builder.ToTable("activities", "act");

                builder.HasKey(a => a.Id);

                builder.Property(a => a.Id)
                       .HasColumnName("id")
                       .IsRequired();

                builder.Property(a => a.Title)
                        .HasColumnName("title")
                        .HasMaxLength(100)
                        .IsRequired();

                builder.Property(a => a.Date)
                        .HasColumnName("date")
                        .IsRequired();

                builder.Property(a => a.TotalAmount)
                        .HasColumnName("total_amount")
                        .IsRequired();

                builder.HasMany(a => a.Transactions)
                       .WithOne(p => p.Activity)
                       //    .HasForeignKey("activity_id")
                       .IsRequired();
        }
}