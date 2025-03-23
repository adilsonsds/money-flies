namespace app.Models;

public record TransactionFilter
{
    public string SelectedDateType { get; set; } = "payment";
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public List<int> SelectedTagValueIds { get; set; } = [];
}