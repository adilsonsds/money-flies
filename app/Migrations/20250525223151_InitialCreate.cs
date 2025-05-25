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
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FinancialTransactionBatches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ProfileId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialTransactionBatches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinancialTransactionBatches_Profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ProfileId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tags_Profiles_ProfileId",
                        column: x => x.ProfileId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FinancialTransactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BatchId = table.Column<int>(type: "INTEGER", nullable: false),
                    EmissionDate = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    DueDate = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    TransactionDate = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    Observation = table.Column<string>(type: "TEXT", nullable: true),
                    Value = table.Column<decimal>(type: "TEXT", nullable: false),
                    IsEntry = table.Column<bool>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinancialTransactions_FinancialTransactionBatches_BatchId",
                        column: x => x.BatchId,
                        principalTable: "FinancialTransactionBatches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TagValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TagId = table.Column<int>(type: "INTEGER", nullable: false),
                    Value = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TagValues_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FinancialTransactionTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FinancialTransactionId = table.Column<int>(type: "INTEGER", nullable: false),
                    TagId = table.Column<int>(type: "INTEGER", nullable: false),
                    TagValueId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialTransactionTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinancialTransactionTags_FinancialTransactions_FinancialTransactionId",
                        column: x => x.FinancialTransactionId,
                        principalTable: "FinancialTransactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinancialTransactionTags_TagValues_TagValueId",
                        column: x => x.TagValueId,
                        principalTable: "TagValues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FinancialTransactionTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Profiles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Pessoal" },
                    { 2, "Investimentos" },
                    { 3, "Empresarial" },
                    { 4, "Familiar" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name", "ProfileId" },
                values: new object[,]
                {
                    { 1, "Tipo", 1 },
                    { 2, "Categoria", 1 }
                });

            migrationBuilder.InsertData(
                table: "TagValues",
                columns: new[] { "Id", "TagId", "Value" },
                values: new object[,]
                {
                    { 1, 1, "Receita" },
                    { 2, 1, "Despesa" },
                    { 3, 2, "Salário" },
                    { 4, 2, "Bônus e comissões" },
                    { 5, 2, "Dividendos" },
                    { 6, 2, "Rendimentos de investimentos" },
                    { 7, 2, "Aluguel de imóveis" },
                    { 8, 2, "Venda de ativos" },
                    { 9, 2, "Aluguel" },
                    { 10, 2, "Condomínio" },
                    { 11, 2, "Energia elétrica" },
                    { 12, 2, "Água e esgoto" },
                    { 13, 2, "Gás" },
                    { 14, 2, "Internet" },
                    { 15, 2, "Telefone" },
                    { 16, 2, "TV por assinatura e streamings" },
                    { 17, 2, "Supermercado" },
                    { 18, 2, "Combustível" },
                    { 19, 2, "Transporte público" },
                    { 20, 2, "Manutenção do carro" },
                    { 21, 2, "Seguro saúde" },
                    { 22, 2, "Plano de saúde" },
                    { 23, 2, "Mensalidade escolar" },
                    { 24, 2, "Financiamentos e empréstimos" },
                    { 25, 2, "Assinaturas e serviços" },
                    { 26, 2, "Alimentação fora de casa" },
                    { 27, 2, "Lazer e entretenimento" },
                    { 28, 2, "Compras e vestuário" },
                    { 29, 2, "Cuidados pessoais" },
                    { 30, 2, "Viagens e turismo" },
                    { 31, 2, "Hobbies e lazer" },
                    { 32, 2, "Presentes e doações" },
                    { 33, 2, "Eletrônicos e equipamentos" },
                    { 34, 2, "Despesas médicas" },
                    { 35, 2, "Reparos e manutenção" },
                    { 36, 2, "Multas e taxas extras" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactionBatches_ProfileId",
                table: "FinancialTransactionBatches",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactions_BatchId",
                table: "FinancialTransactions",
                column: "BatchId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactionTags_FinancialTransactionId",
                table: "FinancialTransactionTags",
                column: "FinancialTransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactionTags_TagId",
                table: "FinancialTransactionTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancialTransactionTags_TagValueId",
                table: "FinancialTransactionTags",
                column: "TagValueId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_ProfileId",
                table: "Tags",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_TagValues_TagId",
                table: "TagValues",
                column: "TagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FinancialTransactionTags");

            migrationBuilder.DropTable(
                name: "FinancialTransactions");

            migrationBuilder.DropTable(
                name: "TagValues");

            migrationBuilder.DropTable(
                name: "FinancialTransactionBatches");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Profiles");
        }
    }
}
