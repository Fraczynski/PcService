using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using PcService.API.Models;

namespace PcService.API.Data.SeedData
{
   public class Seed
   {
      public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
      {
         if (!userManager.Users.Any())
         {
            var userData = System.IO.File.ReadAllText("Data/SeedData/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);

            var roles = new List<Role>{
                        new Role{Name = "Client"},
                        new Role{Name = "Salesman"},
                        new Role{Name = "Serviceman"},
                        new Role{Name = "Administrator"}
                    };

            foreach (var role in roles)
            {
               roleManager.CreateAsync(role).Wait();
            }

            foreach (var user in users)
            {
               userManager.CreateAsync(user, "password").Wait();
               userManager.AddToRoleAsync(user, "Client").Wait();
            }

            var adminUser = new User
            {
               UserName = "Admin"
            };

            var result = userManager.CreateAsync(adminUser, "password").Result;

            if (result.Succeeded)
            {
               var admin = userManager.FindByNameAsync("Admin").Result;
               userManager.AddToRolesAsync(admin, new[] { "Administrator" }).Wait();
            }
         }
      }

      private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
      {
         using (var hmac = new System.Security.Cryptography.HMACSHA512())
         {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
         }
      }
   }
}