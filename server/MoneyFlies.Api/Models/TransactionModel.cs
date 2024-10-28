namespace MoneyFlies.Api.Models;

public record TransactionModel(
    int CategoryId,
    string Description,
    decimal Amount,
    bool Paid,
    DateOnly Date,
    int AccountIdFrom,
    int AccountIdTo
);
