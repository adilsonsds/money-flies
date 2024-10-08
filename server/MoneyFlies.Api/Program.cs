using System.Text;
using Microsoft.AspNetCore.Mvc;
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

builder.Services.AddCors();

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

app.MapPost("/categories", async (MoneyFliesContext context, [FromBody] CategoryCreateDTO categoryCreateDTO) =>
{
    Category category = new(categoryCreateDTO.Name);
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
        activity.Title
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

app.MapGet("/activities/{activityId}/transactions", async (MoneyFliesContext context, int activityId) =>
{
    var transactions = await context.Transactions
    .Where(a => a.Activity.Id.Equals(activityId))
    .Include(a => a.Category)
    .ToListAsync();

    return Results.Ok(transactions.Select(t => new
    {
        t.Id,
        Category = new
        {
            t.Category.Id,
            t.Category.Name
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
        return Results.NotFound();
    }

    Transaction? transaction = activity.Transactions.FirstOrDefault(t => t.Id.Equals(transactionId));
    if (transaction is null)
    {
        return Results.NotFound();
    }
    Category? category = await context.Categories.FindAsync(transactionCreateDTO.CategoryId);
    if (category is null)
    {
        return Results.NotFound();
    }
    transaction.Update(
        category,
        transactionCreateDTO.Description,
        transactionCreateDTO.Amount,
        transactionCreateDTO.Paid,
        transactionCreateDTO.Date
    );

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

app.MapGet("/summaries/{year}/{month}", async (MoneyFliesContext context, [FromRoute] int year, [FromRoute] int month, [FromQuery] int? categoryId) =>
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

#region Backup endpoints

app.MapGet("/backup/export", async (MoneyFliesContext context) =>
{
    var transactions = await context.Transactions
    .Include(t => t.Activity)
    .Include(t => t.Category)
    .ToListAsync();

    var csv = new StringBuilder();

    csv.AppendLine("Activity,Category,Description,Amount,Paid,Date");

    foreach (var transaction in transactions)
    {
        csv.AppendLine($"{transaction.Activity.Title},{transaction.Category.Name},{transaction.Description},{transaction.Amount},{transaction.Paid},{transaction.Date:yyyy-MM-dd}");
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

        var activity = await context.Activities
        .Where(a => a.Title.Equals(activityName))
        .FirstOrDefaultAsync();

        if (activity is null)
        {
            activity = new Activity(activityName);
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

        activity.AddTransaction(category, description, amount, paid, date);
    }

    await context.SaveChangesAsync();

    return Results.NoContent();
});

#endregion

// configure cors to allow requests from any origin
app.UseCors(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
});

app.Run();
