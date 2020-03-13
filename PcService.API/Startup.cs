using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PcService.API.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using PcService.API.Helpers;
using Microsoft.AspNetCore.Identity;
using PcService.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using AutoMapper;
using PcService.API.Data.Auth;
using PcService.API.Data.Users;
using PcService.API.Data.Equipments;

namespace PcService.API
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
         services.AddControllers().AddNewtonsoftJson(opt =>
            {
               opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
         IdentityBuilder builder = services.AddIdentityCore<User>(opt =>
         {
            opt.Password.RequireDigit = false;
            opt.Password.RequiredLength = 4;
            opt.Password.RequireNonAlphanumeric = false;
            opt.Password.RequireUppercase = false;
         });

         builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
         builder.AddEntityFrameworkStores<DataContext>();
         builder.AddRoleValidator<RoleValidator<Role>>();
         builder.AddRoleManager<RoleManager<Role>>();
         builder.AddSignInManager<SignInManager<User>>();

         services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options =>
                {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                      ValidateIssuer = false,
                      ValidateAudience = false
                   };
                });

         services.AddAuthorization(options =>
         {
            options.AddPolicy("RequireClientRole", policy => policy.RequireRole("Client", "Administrator"));
            options.AddPolicy("RequireSalesmanRole", policy => policy.RequireRole("Salesman", "Administrator"));
            options.AddPolicy("RequireServicemanRole", policy => policy.RequireRole("Serviceman", "Administrator"));
            options.AddPolicy("RequireAdministratorRole", policy => policy.RequireRole("Administrator"));

            options.AddPolicy("RequireEmployeeRole", policy => policy.RequireRole("Administrator", "Serviceman", "Salesman"));
         });

         services.AddDbContext<DataContext>(x => x.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
         services.AddControllers(options =>
         {
            var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            options.Filters.Add(new AuthorizeFilter(policy));
         });
         services.AddCors();
         services.AddAutoMapper(typeof(UsersRepository).Assembly);
         services.AddScoped<IAuthRepository, AuthRepository>();
         services.AddScoped<IEquipmentsRepository, EquipmentsRepository>();
         services.AddScoped<IUsersRepository, UsersRepository>();
      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
      {
         if (env.IsDevelopment())
         {
            app.UseDeveloperExceptionPage();
         }
         else
         {
            app.UseExceptionHandler(builder =>
            {
               builder.Run(async context =>
                       {
                          context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                          var error = context.Features.Get<IExceptionHandlerFeature>();
                          if (error != null)
                          {
                             context.Response.AddApplicationError(error.Error.Message);
                             await context.Response.WriteAsync(error.Error.Message);
                          }
                       });
            });
         }

         // app.UseHttpsRedirection();

         app.UseRouting();

         app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

         app.UseAuthentication();

         app.UseAuthorization();

         app.UseEndpoints(endpoints =>
         {
            endpoints.MapControllers();
            // endpoints.MapFallbackToController("Index", "Fallback");
         });
      }
   }
}
