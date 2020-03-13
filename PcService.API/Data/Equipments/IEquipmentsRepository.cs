using System.Threading.Tasks;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Data.Equipments
{
   public interface IEquipmentsRepository
   {
      void Add<T>(T entity) where T : class;
      void Delete<T>(T entity) where T : class;
      Task<bool> SaveAll();
      Task<PagedList<Equipment>> GetAllEquipments(UserParams userParams);
      Task<PagedList<Equipment>> GetUserEquipments(int userId, UserParams userParams);
   }
}