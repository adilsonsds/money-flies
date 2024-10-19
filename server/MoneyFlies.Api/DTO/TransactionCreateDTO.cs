namespace MoneyFlies.Api.DTO;

public record TransactionCreateDTO(
    int CategoryId,
    string Description,
    decimal Amount,
    bool Paid,
    DateOnly Date,
    int PayerId
);
