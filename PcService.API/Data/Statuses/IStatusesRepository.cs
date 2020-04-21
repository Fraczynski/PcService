using System.Collections.Generic;
using System.Threading.Tasks;
using PcService.API.Models;

namespace PcService.API.Data.Statuses
{
    public interface IStatusesRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<List<EquipmentStatus>> GetClientEquipmentStatuses(int clientId);
        Task<List<EquipmentStatus>> GetSalesmanEquipmentStatuses(int salesmanId);
        Task<List<ElementStatus>> GetServicemanElementStatuses(int servicemanId);
        Task<List<EquipmentStatus>> GetAllEquipmentStatuses();
        Task<List<ElementStatus>> GetAllElementStatuses();
    }
}