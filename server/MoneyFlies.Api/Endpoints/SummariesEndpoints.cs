using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MoneyFlies.Api.Endpoints;

public static class SummariesEndpoints
{
    public static void MapSummariesEndpoints(this WebApplication app)
    {
        app.MapGet("/summaries", async (MoneyFliesContext context) =>
        {
            var summaries = await context.Transactions
            .GroupBy(t => new
            {
                t.Date.Month,
                t.Date.Year,
                Category = new
                {
                    t.Category.Id,
                    t.Category.Name
                },
                Payer = new
                {
                    t.Payer.Id,
                    t.Payer.Name
                }
            })
            .Select(g => new
            {
                Month = g.Key.Month,
                Year = g.Key.Year,
                Category = g.Key.Category,
                Payer = g.Key.Payer,
                Total = g.Sum(t => t.Amount)
            })
            .ToListAsync();

            var agroupedByPayer = summaries
                .GroupBy(s => s.Payer)
                .Select(g => new
                {
                    Id = g.Key.Id,
                    Name = g.Key.Name,
                    Total = g.Sum(s => s.Total),
                    Summaries = g.Select(s => new
                    {
                        s.Month,
                        s.Year,
                        s.Category,
                        s.Total
                    })
                })
                .ToList();

            return Results.Ok(agroupedByPayer);
        });

        app.MapGet("/summaries/{year}/{month}", async (MoneyFliesContext context,
            [FromRoute] int year, [FromRoute] int month, [FromQuery] int? categoryId, [FromQuery] int? payerId) =>
        {
            var query = context.Transactions
            .Where(t => t.Date.Year.Equals(year) && t.Date.Month.Equals(month));

            if (categoryId.HasValue)
            {
                query = query.Where(t => t.Category.Id.Equals(categoryId));
            }

            if (payerId.HasValue)
            {
                query = query.Where(t => t.Payer.Id.Equals(payerId));
            }

            var transactions = await query
            .Select(g => new
            {
                g.Id,
                Activity = new
                {
                    Id = g.Activity.Id,
                    Title = g.Activity.Title
                },
                Category = new
                {
                    Id = g.Category.Id,
                    Name = g.Category.Name
                },
                Payer = new
                {
                    Id = g.Payer.Id,
                    Name = g.Payer.Name
                },
                g.Description,
                g.Amount,
                g.Paid,
                g.Date
            })
            .OrderBy(t => t.Date)
            .ToListAsync();

            return Results.Ok(transactions);
        });
    }
}
