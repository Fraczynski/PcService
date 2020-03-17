using System;
using System.Collections.Generic;
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
         var equipments = _context.Equipments.AsQueryable();

         equipments = filterResults(equipments, userParams);

         return await PagedList<Equipment>.CreateAsync(equipments, userParams.PageNumber, userParams.PageSize);
      }

      public async Task<List<string>> GetAllEquipmentsStatusList()
      {
         var statusList = await _context.Equipments.GroupBy(s => s.Status).Select(s => s.Key).Where(s => s != null).ToListAsync();

         return statusList;
      }

      public async Task<List<string>> GetClientEquipmentsStatusList(int clientId)
      {
         var statusList = await _context.Equipments.Where(e => e.ClientId == clientId).GroupBy(s => s.Status).Select(s => s.Key).Where(s => s != null).ToListAsync();

         return statusList;
      }

      public async Task<Equipment> GetEquipment(int id)
      {
         var equipment = await _context.Equipments.FirstOrDefaultAsync(e => e.Id == id);

         return equipment;
      }

      public async Task<PagedList<Equipment>> GetUserEquipments(int clientId, UserParams userParams)
      {
         var equipments = _context.Equipments.Where(e => e.ClientId == clientId);

         equipments = filterResults(equipments, userParams);

         return await PagedList<Equipment>.CreateAsync(equipments, userParams.PageNumber, userParams.PageSize);
      }

      public async Task<bool> SaveAll()
      {
         return await _context.SaveChangesAsync() > 0;
      }

      private IQueryable<Equipment> filterResults(IQueryable<Equipment> equipments, UserParams userParams)
      {
         equipments = equipments.OrderByDescending(u => u.Id);
         if (!string.IsNullOrEmpty(userParams.Name))
         {
            equipments = equipments.Where(e => e.Name.ToLower().Contains(userParams.Name.ToLower()));
         }
         if (!string.IsNullOrEmpty(userParams.Status))
         {
            equipments = equipments.Where(r => r.Status.Equals(userParams.Status));
         }
         if (!string.IsNullOrEmpty(userParams.ProblemDescription))
         {
            equipments = equipments.Where(r => r.ProblemDescription.ToLower().Contains(userParams.ProblemDescription.ToLower()));
         }
         if (userParams.MinRequestDate != null)
         {
            equipments = equipments.Where(r => r.RequestDate >= userParams.MinRequestDate);
         }
         if (userParams.MaxRequestDate != null)
         {
            equipments = equipments.Where(r => r.RequestDate <= userParams.MaxRequestDate.GetValueOrDefault().AddHours(24));
         }
         if (userParams.MinReleaseDate != null)
         {
            equipments = equipments.Where(r => r.ReleaseDate >= userParams.MinReleaseDate);
         }
         if (userParams.MaxReleaseDate != null)
         {
            equipments = equipments.Where(r => r.ReleaseDate <= userParams.MaxReleaseDate.GetValueOrDefault().AddHours(24));
         }

         if (!string.IsNullOrEmpty(userParams.OrderBy))
         {
            switch (userParams.OrderBy.ToLower())
            {
               case "name":
                  equipments = equipments.OrderBy(r => r.Name);
                  break;
               case "status":
                  equipments = equipments.OrderBy(r => r.Status);
                  break;
               case "requestdate":
                  equipments = equipments.OrderBy(r => r.RequestDate);
                  break;
               case "releasedate":
                  equipments = equipments.OrderBy(r => r.ReleaseDate);
                  break;
               default:
                  equipments = equipments.OrderByDescending(r => r.Id);
                  break;
            }
         }
         return equipments;
      }
   }
}