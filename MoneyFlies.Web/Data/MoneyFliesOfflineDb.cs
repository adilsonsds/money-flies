using DnetIndexedDb.Models;

namespace MoneyFlies.Web.Data;

public class MoneyFliesOfflineDb : IndexedDbDatabaseModel
{
    public MoneyFliesOfflineDb()
    {
        Name = "moneyFliesData";
        Version = 1;
        DbModelId = 0;
        UseKeyGenerator = true;
        Stores = new List<IndexedDbStore>
        {
            new() {
                Name = "Transaction",
                Key = new IndexedDbStoreParameter
                {
                    KeyPath = "Id",
                    AutoIncrement = true
                },
                Indexes = new List<IndexedDbIndex>
                {
                    new() { Name = "Id", Definition = new IndexedDbIndexParameter { Unique = true } },
                    new() { Name = "Type", Definition = new IndexedDbIndexParameter { Unique = false } },
                    new() { Name = "PaymentDate", Definition = new IndexedDbIndexParameter { Unique = false } },
                    new() { Name = "Value", Definition = new IndexedDbIndexParameter { Unique = false } },
                    new() { Name = "WasPaid", Definition = new IndexedDbIndexParameter { Unique = false } },
                    new() { Name = "Description", Definition = new IndexedDbIndexParameter { Unique = false } },
                    new() { Name = "Tags", Definition = new IndexedDbIndexParameter { Unique = false } },
                }
            }
        };
    }
}
