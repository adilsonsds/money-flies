using Microsoft.EntityFrameworkCore;

namespace app.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Category> Categories { get; set; }
    public DbSet<FinancialTransaction> FinancialTransactions { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(280);
            entity.HasMany(e => e.SubCategories).WithOne(g => g.Category).HasForeignKey(e => e.CategoryId);

            entity.Navigation(e => e.SubCategories).AutoInclude();

            entity.HasData(
                new Category(1, "Receitas ativas", "Dinheiro ganho com trabalho ou prestação de serviços."),
                new Category(2, "Receitas passivas", "Dinheiro ganho sem esforço contínuo (investimentos, aluguéis, juros)."),
                new Category(3, "Despesas essenciais", "Necessidades básicas e recorrentes."),
                new Category(4, "Despesas variáveis", "Custos que mudam mensalmente."),
                new Category(5, "Despesas fixas", "Gastos recorrentes com valores previsíveis."),
                new Category(6, "Despesas discricionárias", "Não essenciais, relacionadas a lazer e estilo de vida."),
                new Category(7, "Despesas ocasional", "Gastos não recorrentes ou inesperados.")
            );
        });

        modelBuilder.Entity<SubCategory>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.CategoryId).IsRequired();
            entity.Property(e => e.UsedForRevenue).IsRequired();
            entity.HasOne(e => e.Category).WithMany(g => g.SubCategories).HasForeignKey(e => e.CategoryId);

            entity.Navigation(e => e.Category).AutoInclude();

            entity.HasData(
                new SubCategory(1, 1, "Salário", true),
                new SubCategory(1, 2, "Bônus e comissões", true),
                new SubCategory(2, 3, "Dividendos", true),
                new SubCategory(2, 4, "Rendimentos de investimentos", true),
                new SubCategory(2, 5, "Aluguel de imóveis", true),
                new SubCategory(2, 6, "Venda de ativos", true),
                new SubCategory(3, 7, "Aluguel", false),
                new SubCategory(3, 8, "Condomínio", false),
                new SubCategory(3, 9, "Energia elétrica", false),
                new SubCategory(3, 10, "Água e esgoto", false),
                new SubCategory(3, 11, "Gás", false),
                new SubCategory(3, 12, "Internet", false),
                new SubCategory(3, 13, "Telefone", false),
                new SubCategory(3, 14, "TV por assinatura e streamings", false),
                new SubCategory(3, 15, "Supermercado", false),
                new SubCategory(3, 16, "Combustível", false),
                new SubCategory(3, 17, "Transporte público", false),
                new SubCategory(3, 18, "Manutenção do carro", false),
                new SubCategory(3, 19, "Seguro saúde", false),
                new SubCategory(4, 20, "Plano de saúde", false),
                new SubCategory(4, 21, "Mensalidade escolar", false),
                new SubCategory(4, 22, "Financiamentos e empréstimos", false),
                new SubCategory(4, 23, "Assinaturas e serviços", false),
                new SubCategory(5, 24, "Alimentação fora de casa", false),
                new SubCategory(5, 25, "Lazer e entretenimento", false),
                new SubCategory(5, 26, "Compras e vestuário", false),
                new SubCategory(5, 27, "Cuidados pessoais", false),
                new SubCategory(6, 28, "Viagens e turismo", false),
                new SubCategory(6, 29, "Hobbies e lazer", false),
                new SubCategory(6, 30, "Presentes e doações", false),
                new SubCategory(6, 31, "Eletrônicos e equipamentos", false),
                new SubCategory(7, 32, "Despesas médicas", false),
                new SubCategory(7, 33, "Reparos e manutenção", false),
                new SubCategory(7, 34, "Multas e taxas extras", false)
            );
        });

        modelBuilder.Entity<FinancialTransaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Amount).IsRequired();
            entity.Property(e => e.Date).IsRequired();
            entity.HasOne(e => e.Category).WithMany().HasForeignKey("CategoryId");
            entity.HasOne(e => e.SubCategory).WithMany().HasForeignKey("SubCategoryId");
            entity.Property(e => e.Description).HasMaxLength(280);
            entity.Property(e => e.Paid).IsRequired();
        });
    }
}