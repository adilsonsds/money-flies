using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyFlies.Api.Entities;

namespace MoneyFlies.Api.Endpoints;

public static class BackupEndpoints
{
    public static void MapBackupEndpoints(this WebApplication app)
    {
        app.MapGet("/backup/export", async (MoneyFliesContext context) =>
        {
            var transactions = await context.Transactions
            .Include(t => t.Activity)
            .Include(t => t.Category)
            .Include(t => t.Payer)
            .ToListAsync();

            var csv = new StringBuilder();

            csv.AppendLine("Activity,Category,Description,Amount,Paid,Date,Payer,ActivityDate");

            foreach (var transaction in transactions)
            {
                csv.AppendLine($"{transaction.Activity.Title},{transaction.Category.Name},{transaction.Description},{transaction.Amount},{transaction.Paid},{transaction.Date:yyyy-MM-dd},{transaction.Payer.Name},{transaction.Activity.Date:yyyy-MM-dd}");
            }

            var fileName = $"backup-{DateTime.Now:yyyy-MM-dd}.csv";

            return Results.File(Encoding.UTF8.GetBytes(csv.ToString()), "text/csv", fileName);
        });

        app.MapPost("/backup/import", async (MoneyFliesContext context, [FromForm] IFormFile file) =>
        {
            using var reader = new StreamReader(file.OpenReadStream());
            var csv = await reader.ReadToEndAsync();

            var transactions = csv.Split("\n", StringSplitOptions.RemoveEmptyEntries);

            foreach (var transaction in transactions.Skip(1))
            {
                var values = transaction.Split(",", StringSplitOptions.RemoveEmptyEntries);

                var activityName = values[0];
                var categoryName = values[1];
                var description = values[2];
                var amount = decimal.Parse(values[3]);
                var paid = bool.Parse(values[4]);
                var date = DateOnly.Parse(values[5]);
                var payerName = values[6];
                var activityDate = DateOnly.Parse(values[7]);

                var activity = await context.Activities
                .Where(a => a.Title.Equals(activityName))
                .FirstOrDefaultAsync();

                if (activity is null)
                {
                    activity = new Activity(activityName, activityDate);
                    await context.Activities.AddAsync(activity);
                }

                var category = await context.Categories
                .Where(c => c.Name.Equals(categoryName))
                .FirstOrDefaultAsync();

                if (category is null)
                {
                    category = new Category(categoryName);
                    await context.Categories.AddAsync(category);
                }

                var payer = await context.Payers
                .Where(p => p.Name.Equals(payerName))
                .FirstOrDefaultAsync();

                if (payer is null)
                {
                    payer = new Payer(payerName);
                    await context.Payers.AddAsync(payer);
                }

                activity.AddTransaction(category, description, amount, paid, date, payer);
            }

            await context.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}