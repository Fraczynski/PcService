using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcService.API.Helpers;
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

        public async Task<List<(string, int)>> GetStatistics(string type, StatisticParams statisticParams)
        {
            var elements = _context.Elements.Include(n => n.Name).Include(s => s.Serviceman).Include(e => e.Equipment).AsQueryable();

            elements = Filter(elements, statisticParams);

            return CreateStatistics(type, await elements.ToListAsync());
        }

        public async Task<List<(string, int)>> GetServicemanStatistics(int servicemanId, string type, StatisticParams statisticParams)
        {
            var elements = _context.Elements.Where(e => e.ServicemanId == servicemanId).Include(n => n.Name).Include(e => e.Equipment).AsQueryable();

            elements = Filter(elements, statisticParams);

            return CreateStatistics(type, await elements.ToListAsync());
        }

        private IQueryable<Element> Filter(IQueryable<Element> elements, StatisticParams statisticParams)
        {
            elements = elements.OrderBy(e => e.Name.Name);
            if (statisticParams.ElementName != null)
            {
                elements = elements.Where(e => e.Name.Id == statisticParams.ElementName);
            }
            if (!string.IsNullOrEmpty(statisticParams.ServicemanName))
            {
                elements = elements.Where(e => e.Serviceman.UserName.ToLower().Contains(statisticParams.ServicemanName.ToLower()));
            }
            if (statisticParams.ElementStatus != null)
            {
                elements = elements.Where(r => r.Status.Id == statisticParams.ElementStatus);
            }
            if (statisticParams.MinEquipmentRequestDate != null)
            {
                elements = elements.Where(r => r.Equipment.RequestDate >= statisticParams.MinEquipmentRequestDate);
            }
            if (statisticParams.MaxEquipmentRequestDate != null)
            {
                elements = elements.Where(r => r.Equipment.RequestDate <= statisticParams.MaxEquipmentRequestDate.GetValueOrDefault().AddHours(24));
            }
            if (statisticParams.MinEquipmentReleaseDate != null)
            {
                elements = elements.Where(r => r.Equipment.RequestDate >= statisticParams.MinEquipmentReleaseDate);
            }
            if (statisticParams.MaxEquipmentReleaseDate != null)
            {
                elements = elements.Where(r => r.Equipment.ReleaseDate <= statisticParams.MaxEquipmentReleaseDate.GetValueOrDefault().AddHours(24));
            }
            return elements;
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
                            if (dictionary.ContainsKey(status.Name))
                            {
                                dictionary[status.Name]++;
                            }
                            else
                            {
                                dictionary.Add(status.Name, 1);
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