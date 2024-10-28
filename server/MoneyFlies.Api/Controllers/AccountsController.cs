using Microsoft.AspNetCore.Mvc;
using MoneyFlies.Api.Models;
using MoneyFlies.Domain.Entities;
using MoneyFlies.Domain.Repositories;

namespace MoneyFlies.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountsController(IRepository<Account> repository) : ControllerBase
{
    private readonly IRepository<Account> _repository = repository;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var accounts = await _repository.ListAsync();
        return Ok(accounts.Select(a => new { a.Id, a.Name }).ToList());
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] AccountModel model)
    {
        var account = new Account(model.Name);
        await _repository.AddAsync(account);
        return Ok();
    }
}