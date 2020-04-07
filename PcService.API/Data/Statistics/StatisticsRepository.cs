using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcService.API.Models;

namespace PcService.API.Data.Statistics
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly DataContext _context;
        public StatisticsRepository(DataContext context)
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

        public async Task<List<(string, int)>> GetStatistics(string type)
        {
            var elements = await _context.Elements.Include(n => n.Name).Include(s => s.Serviceman).ToListAsync();

            return CreateStatistics(type, elements);
        }

        public async Task<List<(string, int)>> GetServicemanStatistics(int servicemanId, string type)
        {
            var elements = await _context.Elements.Where(e => e.ServicemanId == servicemanId).Include(n => n.Name).ToListAsync();

            return CreateStatistics(type, elements);
        }

        private List<(string, int)> CreateStatistics(string type, List<Element> elements)
        {
            if (string.IsNullOrEmpty(type))
            {
                throw new System.ArgumentException("message", nameof(type));
            }

            if (elements is null)
            {
                throw new System.ArgumentNullException(nameof(elements));
            }

            var dictionary = new Dictionary<string, int>();

            switch (type.ToLower())
            {
                case "name":
                    foreach (var element in elements)
                    {
                        var name = element.Name.Name;
                        if (name != null)
                        {
                            if (dictionary.ContainsKey(name))
                            {
                                dictionary[name]++;
                            }
                            else
                            {
                                dictionary.Add(name, 1);
                            }
                        }
                    }
                    break;
                case "status":
                    foreach (var element in elements)
                    {
                        var status = element.Status;
                        if (status != null)
                        {
                            if (dictionary.ContainsKey(status))
                            {
                                dictionary[status]++;
                            }
                            else
                            {
                                dictionary.Add(status, 1);
                            }
                        }
                    }
                    break;
                case "warrantyrepair":
                    foreach (var element in elements)
                    {
                        var warrantyrepair = element.WarrantyRepair;
                        if (dictionary.ContainsKey(warrantyrepair.ToString()))
                        {
                            dictionary[warrantyrepair.ToString()]++;
                        }
                        else
                        {
                            dictionary.Add(warrantyrepair.ToString(), 1);
                        }
                    }
                    break;
                case "serviceman":
                    foreach (var element in elements)
                    {
                        if (element.ServicemanId != null)
                        {
                            var serviceman = element.Serviceman.UserName;
                            if (dictionary.ContainsKey(serviceman))
                            {
                                dictionary[serviceman]++;
                            }
                            else
                            {
                                dictionary.Add(serviceman, 1);
                            }
                        }
                    }
                    break;
            }

            var statistics = new List<(string, int)>();

            foreach (var key in dictionary.Keys)
            {
                statistics.Add((key, dictionary[key]));
            }

            return statistics;
        }
    }
}