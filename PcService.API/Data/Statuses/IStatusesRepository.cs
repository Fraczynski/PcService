using System.Threading.Tasks;

namespace PcService.API.Data.Statuses
{
    public interface IStatusesRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
    }
}