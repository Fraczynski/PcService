using System.Collections.Generic;
using System.Threading.Tasks;
using PcService.API.Helpers;

namespace PcService.API.Data.Statistics
{
    public interface IStatisticsRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<List<(string, int)>> GetStatistics(string type, StatisticParams statisticParams);
        Task<List<(string, int)>> GetServicemanStatistics(int servicemanId, string type, StatisticParams statisticParams);
    }
}