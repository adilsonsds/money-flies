using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace app.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 280, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    CategoryId = table.Column<int>(type: "INTEGER", nullable: false),
                    UsedForRevenue = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FinancialTransactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CategoryId = table.Column<int>(type: "INTEGER", nullable: false),
                    SubCategoryId = table.Column<int>(type: "INTEGER", nullable: false),
                    Amount = table.Column<decimal>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 280, nullable: false),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Paid = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinancialTransactions_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinancialTransactions_SubCategories_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalTable: "SubCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Dinheiro ganho com trabalho ou prestação de serviços.", "Receitas ativas" },
                    { 2, "Dinheiro ganho sem esforço contínuo (investimentos, aluguéis, juros).", "Receitas passivas" },
                    { 3, "Necessidades básicas e recorrentes.", "Despesas essenciais" },
                    { 4, "Custos que mudam mensalmente.", "Despesas variáveis" },
                    { 5, "Gastos recorrentes com valores previsíveis.", "Despesas fixas" },
                    { 6, "Não essenciais, relacionadas a lazer e estilo de vida.", "Despesas discricionárias" },
                    { 7, "Gastos não recorrentes ou inesperados.", "Despesas ocasional" }
                });

            migrationBuilder.InsertData(
                table: "SubCategories",
                columns: new[] { "Id", "CategoryId", "Name", "UsedForRevenue" },
                values: new object[,]
                {
                    { 1, 1, "Salário", true },
                    { 2, 1, "Bônus e comissões", true },
                    { 3, 2, "Dividendos", true },
                    { 4, 2, "Rendimentos de investimentos", true },
                    { 5, 2, "Aluguel de imóveis", true },
                    { 6, 2, "Venda de ativos", true },
                    { 7, 3, "Aluguel", false },
                    { 8, 3, "Condomínio", false },
                    { 9, 3, "Energia elétrica", false },
                    { 10, 3, "Água e esgoto", false },
                    { 11, 3, "Gás", false },
                    { 12, 3, "Internet", false },
                    { 13, 3, "Telefone", false },
                    { 14, 3, "TV por assinatura e streamings", false },
                    { 15, 3, "Supermercado", false },
                    { 16, 3, "Combustível", false },
                    { 17, 3, "Transporte público", false },
                    { 18, 3, "Manutenção do carro", false },
                    { 19, 3, "Seguro saúde", false },
                    { 20, 4, "Plano de saúde", false },
                    { 21, 4, "Mensalidade escolar", false },
                    { 22, 4, "Financiamentos e empréstimos", false },
                    { 23, 4, "Assinaturas e serviços", false },
                    { 24, 5, "Alimentação fora de casa", false },
                    { 25, 5, "Lazer e entretenimento", false },
                    { 26, 5, "Compras e vestuário", false },
                    { 27, 5, "Cuidados pessoais", false },
                    { 28, 6, "Viagens e turismo", false },
                    { 29, 6, "Hobbies e lazer", false },
                    { 30, 6, "Presentes e doações", false },
                    { 31, 6, "Eletrônicos e equipamentos", false },
                    { 32, 7, "Despesas médicas", false },
                    { 33, 7, "Reparos e manutenção", false },
                    { 34, 7, "Multas e taxas extras", false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactions_CategoryId",
                table: "FinancialTransactions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactions_SubCategoryId",
                table: "FinancialTransactions",
                column: "SubCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SubCategories_CategoryId",
                table: "SubCategories",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinancialTransactions");

            migrationBuilder.DropTable(
                name: "SubCategories");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
