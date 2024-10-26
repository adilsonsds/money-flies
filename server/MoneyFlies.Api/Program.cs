using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MoneyFlies.Api.Endpoints;

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

app.MapPayersEndpoints();
app.MapCategoriesEndpoints();
app.MapActivitiesEndpoints();
app.MapSummariesEndpoints();
app.MapBackupEndpoints();

// configure cors to allow requests from any origin
app.UseCors(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
});

app.Run();
