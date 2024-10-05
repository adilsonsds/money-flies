namespace MoneyFlies.Api.DTO;

public record ActivityCreateDTO(string Title, List<TransactionCreateDTO> Transactions);
