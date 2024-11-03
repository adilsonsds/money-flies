namespace MoneyFlies.Domain.Repositories.DTO;

public record TransactionsFilter
{
    public int? Year { get; init; } = null;
    public int? Month { get; init; } = null;
    public int? CategoryId { get; init; } = null;
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}
