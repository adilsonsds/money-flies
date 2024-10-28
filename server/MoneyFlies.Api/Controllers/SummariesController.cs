using Microsoft.AspNetCore.Mvc;
using MoneyFlies.Domain.Repositories;

namespace MoneyFlies.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SummariesController(ITransactionRepository repository) : ControllerBase
{
    private readonly ITransactionRepository _repository = repository;

    [HttpGet]
    public async Task<IActionResult> Get() =>
        Ok(await _repository.ListSummaryAsync());
}