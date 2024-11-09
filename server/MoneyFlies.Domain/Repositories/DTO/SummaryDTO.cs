namespace MoneyFlies.Domain.Repositories.DTO;

public record SummaryDTO(
    int Year,
    int Month,
    CategorySummaryDTO Category,
    AccountSummaryDTO AccountFrom,
    AccountSummaryDTO AccountTo,
    decimal TotalAmount);

public record CategorySummaryDTO(int Id, string Name);

public record AccountSummaryDTO(int Id, string Name);