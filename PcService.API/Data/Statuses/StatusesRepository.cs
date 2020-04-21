using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcService.API.Models;

namespace PcService.API.Data.Statuses
{
    public class StatusesRepository : IStatusesRepository
    {
        private readonly DataContext _context;
        public StatusesRepository(DataContext context)
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

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<EquipmentStatus>> GetAllEquipmentStatuses()
        {
            var statusList = await _context.EquipmentStatuses.ToListAsync();

            return statusList;
        }

        public async Task<List<EquipmentStatus>> GetClientEquipmentStatuses(int clientId)
        {
            var statusList = await _context.EquipmentStatuses.Include(e => e.Equipments).Where(e => e.Equipments.FirstOrDefault(e => e.ClientId == clientId) != null).ToListAsync();

            return statusList;
        }

        public async Task<List<EquipmentStatus>> GetSalesmanEquipmentStatuses(int salesmanId)
        {
            var statusList = await _context.EquipmentStatuses.Include(e => e.Equipments).Where(e => e.Equipments.FirstOrDefault(e => e.EmployeeId == salesmanId) != null).ToListAsync();

            return statusList;
        }

        public async Task<List<ElementStatus>> GetServicemanElementStatuses(int servicemanId)
        {
            var statusList = await _context.ElementStatuses.Include(e => e.Elements).Where(e => e.Elements.FirstOrDefault(e => e.ServicemanId == servicemanId) != null).ToListAsync();

            return statusList;
        }

        public async Task<List<ElementStatus>> GetAllElementStatuses()
        {
            var statusList = await _context.ElementStatuses.ToListAsync();

            return statusList;
        }
    }
}