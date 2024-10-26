using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyFlies.Api.DTO;
using MoneyFlies.Api.Entities;

namespace MoneyFlies.Api.Endpoints;

public static class CategoriesEndpoints
{
    public static void MapCategoriesEndpoints(this WebApplication app)
    {
        app.MapGet("/categories", async (MoneyFliesContext context) =>
            Results.Ok(await context.Categories.OrderBy(c => c.Name).ToListAsync()));

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
    }
}
