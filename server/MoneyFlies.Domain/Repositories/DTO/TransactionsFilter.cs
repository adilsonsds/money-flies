namespace MoneyFlies.Domain.Repositories.DTO;

public record TransactionsFilter
{
    public int Year { get; init; } = DateTime.Now.Year;
    public int Month { get; init; } = DateTime.Now.Month;
    public int? CategoryId { get; init; } = null;
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}
