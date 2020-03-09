using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcService.API.Models;
using System.Linq;
using AutoMapper;
using PcService.API.Helpers;

namespace PcService.API.Data
{
   public class ServiceRepository : IServiceRepository
   {
      private readonly DataContext _context;
      public ServiceRepository(DataContext context)
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

      public Task<Repair> GetRepairByNumber(int number)
      {
         var repairs = _context.Repairs.Where(r => r.ClientId == null).Where(r => r.RepairId == number).FirstOrDefaultAsync();

         return repairs;
      }
      public async Task<PagedList<Repair>> GetRepairs(UserParams userParams)
      {
         var repairs = _context.Repairs.AsQueryable();

         repairs = filterResult(repairs, userParams);

         return await PagedList<Repair>.CreateAsync(repairs, userParams.PageNumber, userParams.PageSize);
      }

      public async Task<List<Repair>> GetRepairs()
      {
         var repairs = await _context.Repairs.ToListAsync();

         return repairs;
      }

      public async Task<PagedList<Repair>> GetRepairsForUser(UserParams userParams, int userId, bool client)
      {
         var repairs = _context.Repairs.Include(u => u.Client).Include(u => u.Employee).AsQueryable();

         if (client)
         {
            repairs = repairs.Where(r => r.ClientId == userId);
         }
         else
         {
            repairs = repairs.Where(r => r.EmployeeId == userId);
         }

         repairs = filterResult(repairs, userParams);

         return await PagedList<Repair>.CreateAsync(repairs, userParams.PageNumber, userParams.PageSize);
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

      public async Task<bool> SaveAll()
      {
         return await _context.SaveChangesAsync() > 0;
      }

      private IQueryable<Repair> filterResult(IQueryable<Repair> repairs, UserParams userParams)
      {
         if (userParams.RepairId != null)
         {
            repairs = repairs.Where(r => r.RepairId == userParams.RepairId);
         }
         else
         {
            if (userParams.ElementName != null)
            {
               repairs = repairs.Where(r => r.ElementName == userParams.ElementName);
            }
            if (userParams.Result != null)
            {
               repairs = repairs.Where(r => r.Result == userParams.Result);
            }
            if (userParams.WarrantyRepair != null)
            {
               repairs = repairs.Where(r => r.WarrantyRepair == userParams.WarrantyRepair);
            }
            if (userParams.MinWarrantyExpiryDate != null)
            {
               repairs = repairs.Where(r => r.WarrantyExpiryDate >= userParams.MinWarrantyExpiryDate);
            }
            if (userParams.MaxWarrantyExpiryDate != null)
            {
               repairs = repairs.Where(r => r.WarrantyExpiryDate <= userParams.MaxWarrantyExpiryDate);
            }
         }
         return repairs;
      }
   }
}