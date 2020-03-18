using System.Collections.Generic;
using System.Threading.Tasks;
using PcService.API.Models;

namespace PcService.API.Data.Users
{
   public interface IUsersRepository
   {
      Task<List<User>> GetUsers();
      Task<User> GetUser(int id);
      Task<User> GetUser(string userName);
   }
}