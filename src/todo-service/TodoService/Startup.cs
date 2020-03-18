using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TodoService.Infrastructure;

namespace TodoService
{
    public class Startup
    {
        private readonly IConfiguration Configuration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<TodoContext>(options =>
            {
                var connectionStringPieces = new List<string> {
                    $"Server={Configuration["POSTGRES_HOST"]}",
                    $"Port={Configuration["POSTGRES_PORT"]}",
                    $"Database={Configuration["POSTGRES_DATABASE"]}",
                    $"User Id={Configuration["POSTGRES_USERNAME"]}",
                    $"Password={Configuration["POSTGRES_PASSWORD"]}",
                };
                var connectionString = string.Join(';', connectionStringPieces);
                options.UseNpgsql(connectionString);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var todoContext = (TodoContext)serviceProvider.GetService(typeof(TodoContext));
            using (todoContext)
            {
                todoContext.Database.Migrate();
                new TodoContextSeed(todoContext).DoSeed();
            }
        }
    }
}
