using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcService.API.Models;

namespace PcService.API.Data.Users
{
   public class UsersRepository : IUsersRepository
   {
      private readonly DataContext _context;
      public UsersRepository(DataContext context)
      {
         _context = context;
      }
      public async Task<User> GetUser(int id)
      {
         var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

         return user;
      }

      public async Task<List<User>> GetUsers()
      {
         var users = await _context.Users.ToListAsync();

         return users;
      }
   }
}