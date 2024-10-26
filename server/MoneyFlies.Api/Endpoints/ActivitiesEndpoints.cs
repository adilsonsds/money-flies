using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyFlies.Api.DTO;
using MoneyFlies.Api.Entities;

namespace MoneyFlies.Api.Endpoints;

public static class ActivitiesEndpoints
{
    public static void MapActivitiesEndpoints(this WebApplication app)
    {
        app.MapPost("/activities", async (MoneyFliesContext context, ActivityCreateDTO activityCreateDTO) =>
        {
            Activity activity = new(
                activityCreateDTO.Title,
                activityCreateDTO.Date
                );

            await context.Activities.AddAsync(activity);
            await context.SaveChangesAsync();
            return Results.Created($"/activities/{activity.Id}", activity.Id);
        });

        app.MapGet("/activities/{activityId}", async (MoneyFliesContext context, int activityId) =>
        {
            Activity? activity = await context.Activities
            .Where(a => a.Id.Equals(activityId))
            .Include(a => a.Transactions)
            .FirstOrDefaultAsync();

            if (activity is null)
            {
                return Results.NotFound();
            }

            return Results.Ok(new
            {
                activity.Id,
                activity.Title,
                activity.Date,
                activity.TotalAmount,
            });
        });

        app.MapDelete("/activities/{activityId}", async (MoneyFliesContext context, int activityId) =>
        {
            Activity? activity = await context.Activities.FindAsync(activityId);
            if (activity is null)
            {
                return Results.NotFound();
            }
            context.Activities.Remove(activity);
            await context.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapPost("/activities/{activityId}/transactions", async (MoneyFliesContext context, int activityId, TransactionCreateDTO transactionCreateDTO) =>
        {
            Activity? activity = await context.Activities.FindAsync(activityId);
            if (activity is null)
            {
                return Results.NotFound();
            }
            Category? category = await context.Categories.FindAsync(transactionCreateDTO.CategoryId);
            if (category is null)
            {
                return Results.NotFound();
            }
            Payer? payer = await context.Payers.FindAsync(transactionCreateDTO.PayerId);
            if (payer is null)
            {
                return Results.NotFound();
            }

            var transaction = activity.AddTransaction(
                category,
                transactionCreateDTO.Description,
                transactionCreateDTO.Amount,
                transactionCreateDTO.Paid,
                transactionCreateDTO.Date,
                payer
                );

            await context.SaveChangesAsync();
            return Results.Created($"/activities/{activity.Id}/transactions/{transaction.Id}", transaction.Id);
        });

        app.MapGet("/activities/{activityId}/transactions", async (MoneyFliesContext context, int activityId) =>
        {
            var transactions = await context.Transactions
            .Where(a => a.Activity.Id.Equals(activityId))
            .Include(a => a.Category)
            .Include(a => a.Payer)
            .OrderBy(a => a.Date)
            .ToListAsync();

            return Results.Ok(transactions.Select(t => new
            {
                t.Id,
                Category = new
                {
                    t.Category.Id,
                    t.Category.Name
                },
                Payer = new
                {
                    t.Payer.Id,
                    t.Payer.Name
                },
                t.Description,
                t.Amount,
                t.Paid,
                t.Date
            }));
        });

        app.MapPut("/activities/{activityId}/transactions/{transactionId}", async (MoneyFliesContext context, int activityId, int transactionId, [FromBody] TransactionCreateDTO transactionCreateDTO) =>
        {
            Activity? activity = await context.Activities
            .Where(a => a.Id.Equals(activityId))
            .Include(a => a.Transactions)
            .FirstOrDefaultAsync();

            if (activity is null)
            {
                return Results.BadRequest();
            }

            Category? category = await context.Categories.FindAsync(transactionCreateDTO.CategoryId);
            if (category is null)
            {
                return Results.BadRequest();
            }

            Payer? payer = await context.Payers.FindAsync(transactionCreateDTO.PayerId);
            if (payer is null)
            {
                return Results.BadRequest();
            }

            try
            {
                activity.UpdateTransaction(
                    transactionId,
                    category,
                    transactionCreateDTO.Description,
                    transactionCreateDTO.Amount,
                    transactionCreateDTO.Paid,
                    transactionCreateDTO.Date,
                    payer
                );
            }
            catch (ArgumentException)
            {
                return Results.NotFound();
            }

            await context.SaveChangesAsync();
            return Results.NoContent();
        });

        app.MapDelete("/activities/{activityId}/transactions/{transactionId}", async (MoneyFliesContext context, int activityId, int transactionId) =>
        {
            Activity? activity = await context.Activities
            .Where(a => a.Id.Equals(activityId))
            .Include(a => a.Transactions)
            .FirstOrDefaultAsync();

            if (activity is null)
            {
                return Results.NotFound();
            }

            Transaction? transaction = activity.Transactions.FirstOrDefault(t => t.Id.Equals(transactionId));
            if (transaction is null)
            {
                return Results.NotFound();
            }
            activity.RemoveTransaction(transaction);
            await context.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}