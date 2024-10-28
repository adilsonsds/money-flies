using Microsoft.AspNetCore.Mvc;
using MoneyFlies.Api.Models;
using MoneyFlies.Domain.Entities;
using MoneyFlies.Domain.Repositories;

namespace MoneyFlies.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(IRepository<Category> repository) : ControllerBase
{
    private readonly IRepository<Category> _repository = repository;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var categories = await _repository.ListAsync();
        return Ok(categories.Select(c => new { c.Id, c.Name }).ToList());
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CategoryModel model)
    {
        var category = new Category(model.Name);
        await _repository.AddAsync(category);
        return Ok();
    }
}
