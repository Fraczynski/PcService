using System.Collections.Generic;
using System.Threading.Tasks;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Data.Repairs
{
   public interface IRepairsRepository
   {
      void Add<T>(T entity) where T : class;
      void Delete<T>(T entity) where T : class;
      Task<bool> SaveAll();
      Task<Repair> GetRepairByNumber(int number);
      Task<PagedList<Repair>> GetRepairsForUser(UserParams userParams, int userId, bool client);
      Task<PagedList<Repair>> GetRepairs(UserParams userParams);
      Task<List<Repair>> GetRepairs();
      Task<List<string>> GetElementNames();
      Task<List<string>> GetResultOptions();
   }
}