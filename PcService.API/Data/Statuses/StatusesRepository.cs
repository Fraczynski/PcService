using System.Threading.Tasks;

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
    }
}