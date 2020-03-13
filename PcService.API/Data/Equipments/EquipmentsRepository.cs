using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Data.Equipments
{
   public class EquipmentsRepository : IEquipmentsRepository
   {
      private readonly DataContext _context;
      public EquipmentsRepository(DataContext context)
      {
         _context = context;
      }
      public void Add<T>(T entity) where T : class
      {
         _context.Add(entity);
      }

      public void Delete<T>(T entity) where T : class
      {
         _context.Remove(entity);
      }

      public async Task<PagedList<Equipment>> GetAllEquipments(UserParams userParams)
      {
         var equipments = _context.Equipments;

         return await PagedList<Equipment>.CreateAsync(equipments, userParams.PageNumber, userParams.PageSize);
      }

      public async Task<Equipment> GetEquipment(int id)
      {
         var equipment = await _context.Equipments.FirstOrDefaultAsync(e => e.Id == id);

         return equipment;
      }

      public async Task<PagedList<Equipment>> GetUserEquipments(int userId, UserParams userParams)
      {
         var equipments = _context.Equipments.Where(e => e.ClientId == userId);

         return await PagedList<Equipment>.CreateAsync(equipments, userParams.PageNumber, userParams.PageSize);
      }

      public async Task<bool> SaveAll()
      {
         return await _context.SaveChangesAsync() > 0;
      }
   }
}