using Code_Challenge_Full_Stack.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Code_Challenge_Full_Stack
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<BoatDBContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("AzureConnection")));

            // Configure CORS to allow access from the static web app.
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000", "https://happy-hill-001d40f10.1.azurestaticapps.net")
                        .AllowAnyHeader().AllowAnyMethod();
                    });

                options.AddPolicy("OpenPolicy",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000", "https://happy-hill-001d40f10.1.azurestaticapps.net")
                        .AllowAnyHeader().AllowAnyMethod();
                    });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
