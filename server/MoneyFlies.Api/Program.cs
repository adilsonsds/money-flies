using System.Collections.ObjectModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MoneyFlies.Api.DTO;
using MoneyFlies.Api.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(options =>
{
    options.MapType<DateOnly>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "date"
    });
});

builder.Services.AddDbContext<MoneyFliesContext>(options =>
{
    options.UseNpgsql(builder.Configuration["ConnectionStrings:MoneyFliesContext"]!);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
app.UseSwagger();
app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.MapGet("/", () => "Hello World!");

#region Categories endpoints

app.MapGet("/categories", async (MoneyFliesContext context) =>
    Results.Ok(await context.Categories.ToListAsync()));

app.MapPost("/categories", async (MoneyFliesContext context, string name) =>
{
    Category category = new(name);
    await context.Categories.AddAsync(category);
    await context.SaveChangesAsync();
    return Results.Created($"/categories/{category.Id}", category);
});

app.MapDelete("/categories/{categoryId}", async (MoneyFliesContext context, int categoryId) =>
{
    Category? category = await context.Categories.FindAsync(categoryId);
    if (category is null)
    {
        return Results.NotFound();
    }
    context.Categories.Remove(category);
    await context.SaveChangesAsync();
    return Results.NoContent();
});

#endregion

#region Activities endpoints

app.MapPost("/activities", async (MoneyFliesContext context, ActivityCreateDTO activityCreateDTO) =>
{
    Activity activity = new(activityCreateDTO.Title);

    var transactions = new Collection<Transaction>();

    foreach (var transaction in activityCreateDTO.Transactions)
    {
        Category? category = await context.Categories.FindAsync(transaction.CategoryId);
        if (category is null)
        {
            return Results.NotFound();
        }
        _ = activity.AddTransaction(
            category,
            transaction.Description,
            transaction.Amount,
            transaction.Paid,
            transaction.Date
            );
    }

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
    return Results.Ok(activity);
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

    var transaction = activity.AddTransaction(
        category,
        transactionCreateDTO.Description,
        transactionCreateDTO.Amount,
        transactionCreateDTO.Paid,
        transactionCreateDTO.Date
        );

    await context.SaveChangesAsync();
    return Results.Created($"/activities/{activity.Id}/transactions/{transaction.Id}", transaction.Id);
});

app.MapPut("/activities/{activityId}/transactions/{transactionId}", async (MoneyFliesContext context, int activityId, int transactionId, int categoryId, string description, decimal amount, bool paid, DateOnly date) =>
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
    Category? category = await context.Categories.FindAsync(categoryId);
    if (category is null)
    {
        return Results.NotFound();
    }
    transaction.Update(category, description, amount, paid, date);
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
    activity.Transactions.Remove(transaction);
    await context.SaveChangesAsync();
    return Results.NoContent();
});
#endregion

#region Transactions endpoints

app.MapGet("/summaries", async (MoneyFliesContext context) =>
{
    var summaries = await context.Transactions
    .GroupBy(t => new { t.Date.Month, t.Date.Year, t.Category.Id, t.Category.Name })
    .Select(g => new
    {
        Month = g.Key.Month,
        Year = g.Key.Year,
        Category = new
        {
            Id = g.Key.Id,
            Name = g.Key.Name
        },
        Total = g.Sum(t => t.Amount)
    })
    .ToListAsync();

    return Results.Ok(summaries);
});

app.MapGet("/summaries/{year}/{month}", async (MoneyFliesContext context, int year, int month, int? categoryId) =>
{
    var query = context.Transactions
    .Where(t => t.Date.Year.Equals(year) && t.Date.Month.Equals(month));

    if (categoryId.HasValue)
    {
        query = query.Where(t => t.Category.Id.Equals(categoryId));
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
        g.Description,
        g.Amount,
        g.Paid,
        g.Date
    })
    .ToListAsync();

    return Results.Ok(transactions);
});

#endregion

app.Run();
