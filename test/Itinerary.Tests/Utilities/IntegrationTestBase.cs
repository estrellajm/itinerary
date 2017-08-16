using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Itinerary.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Itinerary.Tests.Utilities
{
  public abstract class IntegrationTestBase : IDisposable
  {
    private readonly HttpClient _httpClient;

    protected IntegrationTestBase()
    {
      _httpClient = GetClient();
    }

    public void Dispose()
    {
      _httpClient?.Dispose();

      const string dbFileName = "itinerary.integration.db";
      if ( File.Exists( dbFileName ) )
        File.Delete( dbFileName );
    }

    protected async Task<T> GetAsync<T>( string url )
    {
      HttpResponseMessage response = await _httpClient.GetAsync( url );
      string resultString = await GetResponseString( response );
      return FromJson<T>( resultString );
    }

    protected async Task<T> PostAsync<T>( string url, object body )
    {
      HttpContent content = new StringContent(
        JsonConvert.SerializeObject( body ), Encoding.UTF8, "application/json" );
      HttpResponseMessage response = await _httpClient.PostAsync( url, content );
      string resultString = await GetResponseString( response );
      return FromJson<T>( resultString );
    }

    private static async Task<string> GetResponseString( HttpResponseMessage response )
    {
      return await response.Content.ReadAsStringAsync();
    }

    private static T FromJson<T>( string json )
    {
      return JsonConvert.DeserializeObject<T>( json );
    }

    private static HttpClient GetClient()
    {
      IConfigurationRoot configuration = new ConfigurationBuilder().Build();
      IWebHostBuilder builder = new WebHostBuilder()
        .UseEnvironment( "Integration" )
        .UseConfiguration( configuration )
        .UseStartup<Startup>();
      var testServer = new TestServer( builder );
      HttpClient client = testServer.CreateClient();
      return client;
    }
  }
}
