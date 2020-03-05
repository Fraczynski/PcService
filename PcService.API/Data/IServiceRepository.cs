using System.Collections.Generic;
using System.Threading.Tasks;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Data
{
   public interface IServiceRepository
   {
      void Add<T>(T entity) where T : class;
      void Delete<T>(T entity) where T : class;
      Task<bool> SaveAll();
      // Task<PagedList<User>> GetUsers(UserParams userParams);
      Task<List<User>> GetUsers();
      Task<User> GetUser(int id);
      Task<Repair> GetRepairByNumber(int number);
      Task<List<Repair>> GetRepairsForUser(int userId, bool client);
      Task<PagedList<Repair>> GetRepairs(UserParams userParams);
      Task<List<Repair>> GetRepairs();
   }
}