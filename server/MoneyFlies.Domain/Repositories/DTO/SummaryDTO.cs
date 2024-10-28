namespace MoneyFlies.Domain.Repositories.DTO;

public record SummaryDTO
{
    public int Year { get; set; }
    public int Month { get; set; }
    public CategorySummaryDTO Category { get; set; }
    public decimal TotalAmount { get; set; }

    public record CategorySummaryDTO
    {
        public int Id { get; init; }
        public string Name { get; init; }
    }
}
