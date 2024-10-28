using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MoneyFlies.Domain.Repositories;
using MoneyFlies.Infra.Repositories;

namespace MoneyFlies.Infra;

public static class DependencyInjection
{
    public static IServiceCollection AddInfra(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<MoneyFliesContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<ITransactionRepository, TransactionRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IAccountRepository, AccountRepository>();

        return services;
    }
}
