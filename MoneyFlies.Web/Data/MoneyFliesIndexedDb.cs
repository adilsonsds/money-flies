using DnetIndexedDb;
using Microsoft.JSInterop;

namespace MoneyFlies.Web.Data;

public class MoneyFliesIndexedDb : IndexedDbInterop
{
    public MoneyFliesIndexedDb(IJSRuntime jsRuntime, IndexedDbOptions<MoneyFliesIndexedDb> options) 
        : base(jsRuntime, options)
    {
        
    }
}
