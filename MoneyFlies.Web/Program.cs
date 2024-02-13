using Blazored.LocalStorage;
using DnetIndexedDb;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MoneyFlies.Web;
using MoneyFlies.Web.Data;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddBlazoredLocalStorageAsSingleton();

builder.Services.AddIndexedDbDatabase<MoneyFliesIndexedDb>(options =>
    options.UseDatabase(new MoneyFliesOfflineDb())
);

await builder.Build().RunAsync();
