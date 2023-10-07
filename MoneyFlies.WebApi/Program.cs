using MoneyFlies.WebApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var transactions = new List<Transaction>();

// TODO: criar teste integrado
app.MapGet("/transactions", () => {
    return transactions;
})
.WithName("GetTransactions")
.WithOpenApi();

// TODO: criar teste integrado
app.MapPost("/transactions", (DateOnly PaymentDate, string Category,  decimal Value, bool IsPaid, string? Description) => {
    var transaction = new Transaction(PaymentDate, Category, Value, IsPaid, Description);
    transactions.Add(transaction);
    return transaction.Id;
})
.WithName("PostTransactions")
.WithOpenApi();

app.Run();