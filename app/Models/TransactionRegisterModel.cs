
namespace app.Models;

record BatchModel
{
    public int? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<TransactionModel> Transactions { get; set; } = [];
}

record TransactionModel
{
    public int? Id { get; set; }
    public DateOnly? IssueDate { get; set; }
    public DateOnly? DueDate { get; set; }
    public DateOnly? PaymentDate { get; set; }
    public string? Observation { get; set; }
    public decimal Value { get; set; }
    public bool IsEntry { get; set; }
    public int Status { get; set; }
    public List<TagValueModel> Tags { get; set; } = [];
}

record TagValueModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ValueName { get; set; } = string.Empty;
    public int ValueId { get; set; }

}