using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyFlies.Api.DTO;
using MoneyFlies.Api.Entities;

namespace MoneyFlies.Api.Endpoints;

public static class PayersEndpoints
{
    public static void MapPayersEndpoints(this WebApplication app)
    {
        app.MapGet("/payers", async (MoneyFliesContext context) =>
            Results.Ok(await context.Payers.OrderBy(p => p.Name).ToListAsync()));

        app.MapGet("/payers/{payerId}", async (MoneyFliesContext context, int payerId) =>
        {
            Payer? payer = await context.Payers.FindAsync(payerId);
            if (payer is null)
            {
                return Results.NotFound();
            }
            return Results.Ok(payer);
        });

        app.MapPost("/payers", async (MoneyFliesContext context, [FromBody] PayerCreateDTO payerCreateDTO) =>
        {
            Payer payer = new(payerCreateDTO.Name);
            await context.Payers.AddAsync(payer);
            await context.SaveChangesAsync();
            return Results.Created($"/payers/{payer.Id}", payer);
        });
    }
}