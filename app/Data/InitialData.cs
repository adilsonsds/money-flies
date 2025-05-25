namespace app.Data;

public class InitialData
{
    public static IEnumerable<Profile> Profiles =>
    [
        new() { Id = 1, Name = "Pessoal" },
        new() { Id = 2, Name = "Investimentos" },
        new() { Id = 3, Name = "Empresarial" },
        new() { Id = 4, Name = "Familiar" },
    ];

    public static IEnumerable<Tag> Tags =>
    [
        new() { Id = 1, Name = "Tipo", ProfileId = 1 },
        new() { Id = 2, Name = "Categoria", ProfileId = 1 },
    ];

    public static IEnumerable<TagValue> TagValues =>
    [
        new() { Id = 1, TagId = 1, Value = "Receita" },
        new() { Id = 2, TagId = 1, Value = "Despesa" },
        new() { Id = 3, TagId = 2, Value =  "Salário" },
        new() { Id = 4, TagId = 2, Value =  "Bônus e comissões" },
        new() { Id = 5, TagId = 2, Value =  "Dividendos" },
        new() { Id = 6, TagId = 2, Value =  "Rendimentos de investimentos" },
        new() { Id = 7, TagId = 2, Value =  "Aluguel de imóveis" },
        new() { Id = 8, TagId = 2, Value =  "Venda de ativos" },
        new() { Id = 9, TagId = 2, Value =  "Aluguel" },
        new() { Id = 10, TagId = 2, Value =  "Condomínio" },
        new() { Id = 11, TagId = 2, Value =  "Energia elétrica" },
        new() { Id = 12, TagId = 2, Value =  "Água e esgoto" },
        new() { Id = 13, TagId = 2, Value =  "Gás" },
        new() { Id = 14, TagId = 2, Value =  "Internet" },
        new() { Id = 15, TagId = 2, Value =  "Telefone" },
        new() { Id = 16, TagId = 2, Value =  "TV por assinatura e streamings" },
        new() { Id = 17, TagId = 2, Value =  "Supermercado" },
        new() { Id = 18, TagId = 2, Value =  "Combustível" },
        new() { Id = 19, TagId = 2, Value =  "Transporte público" },
        new() { Id = 20, TagId = 2, Value =  "Manutenção do carro" },
        new() { Id = 21, TagId = 2, Value =  "Seguro saúde" },
        new() { Id = 22, TagId = 2, Value =  "Plano de saúde" },
        new() { Id = 23, TagId = 2, Value =  "Mensalidade escolar" },
        new() { Id = 24, TagId = 2, Value =  "Financiamentos e empréstimos" },
        new() { Id = 25, TagId = 2, Value =  "Assinaturas e serviços" },
        new() { Id = 26, TagId = 2, Value =  "Alimentação fora de casa" },
        new() { Id = 27, TagId = 2, Value =  "Lazer e entretenimento" },
        new() { Id = 28, TagId = 2, Value =  "Compras e vestuário" },
        new() { Id = 29, TagId = 2, Value =  "Cuidados pessoais" },
        new() { Id = 30, TagId = 2, Value =  "Viagens e turismo" },
        new() { Id = 31, TagId = 2, Value =  "Hobbies e lazer" },
        new() { Id = 32, TagId = 2, Value =  "Presentes e doações" },
        new() { Id = 33, TagId = 2, Value =  "Eletrônicos e equipamentos" },
        new() { Id = 34, TagId = 2, Value =  "Despesas médicas" },
        new() { Id = 35, TagId = 2, Value =  "Reparos e manutenção" },
        new() { Id = 36, TagId = 2, Value =  "Multas e taxas extras" }
    ];
}