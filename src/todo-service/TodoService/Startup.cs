using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TodoService.Infrastructure;
using TodoService.Infrastructure.Configuration;
using TodoService.Infrastructure.Services;

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

            var issuer = Configuration.GetSection("Security:Tokens:Issuer").Value;
            var audience = Configuration.GetSection("Security:Tokens:Audience").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TOKEN_KEY"]));

            services.AddSingleton(new TokenConfiguration(issuer, audience, key));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = issuer,

                        ValidateAudience = true,
                        ValidAudience = audience,

                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,

                        ClockSkew = TimeSpan.FromMinutes(5),
                        RequireExpirationTime = true,
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Cookies["authorization"];
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddSingleton<ITokenService, TokenService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

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
