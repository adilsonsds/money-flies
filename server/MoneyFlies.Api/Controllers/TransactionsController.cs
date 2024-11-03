using Microsoft.AspNetCore.Mvc;
using MoneyFlies.Api.Models;
using MoneyFlies.Domain.Entities;
using MoneyFlies.Domain.Repositories;
using MoneyFlies.Domain.Repositories.DTO;

namespace MoneyFlies.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TransactionsController(ITransactionRepository repository) : ControllerBase
{
    private readonly ITransactionRepository _repository = repository;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] TransactionsFilter filter) =>
        Ok(await _repository.ListPagedAsync(filter));

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var transaction = await _repository.GetByIdAsync(id);
        if (transaction == null)
        {
            return NotFound();
        }

        return Ok(new TransactionDTO(transaction));
    }

    [HttpPost]
    public async Task<IActionResult> Post(
        [FromServices] ICategoryRepository categoryRepository,
        [FromServices] IAccountRepository accountRepository,
        [FromBody] TransactionModel model)
    {
        var category = await categoryRepository.GetByIdAsync(model.CategoryId);
        var accountFrom = await accountRepository.GetByIdAsync(model.AccountIdFrom);
        var accountTo = await accountRepository.GetByIdAsync(model.AccountIdTo);

        if (category == null || accountFrom == null || accountTo == null)
        {
            return BadRequest();
        }

        var transaction = new Transaction(
            model.Amount,
            category,
            model.Description,
            accountFrom,
            accountTo,
            model.Date,
            model.Paid
        );

        await _repository.AddAsync(transaction);
        return Ok(transaction);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(
        [FromServices] ICategoryRepository categoryRepository,
        [FromServices] IAccountRepository accountRepository,
        int id,
        [FromBody] TransactionModel model)
    {
        var category = await categoryRepository.GetByIdAsync(model.CategoryId);
        var accountFrom = await accountRepository.GetByIdAsync(model.AccountIdFrom);
        var accountTo = await accountRepository.GetByIdAsync(model.AccountIdTo);

        if (category == null || accountFrom == null || accountTo == null)
        {
            return BadRequest();
        }

        var transaction = await _repository.GetByIdAsync(id);
        if (transaction == null)
        {
            return NotFound();
        }

        transaction.Update(
            model.Amount,
            category,
            model.Description,
            accountFrom,
            accountTo,
            model.Date,
            model.Paid
        );

        await _repository.UpdateAsync(transaction);
        return Ok(transaction);
    }
}
