using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcService.API.Dtos;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Data.Elements
{
    public class ElementsRepository : IElementsRepository
    {
        private readonly DataContext _context;
        public ElementsRepository(DataContext context)
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

        public async Task<List<Element>> GetEquipmentElements(int equipmentId)
        {
            var elements = _context.Elements.Where(e => e.EquipmentId == equipmentId).Include(n => n.Name).Include(s => s.Serviceman).Include(s => s.Status);

            return await elements.ToListAsync();

        }

        public async Task<Element> GetElement(int id)
        {
            var element = await _context.Elements.Include(s => s.Status).FirstOrDefaultAsync(e => e.Id == id);

            return element;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<PagedList<Element>> GetAllElements(UserParams userParams)
        {
            var elements = _context.Elements.Include(n => n.Name).Include(s => s.Serviceman).Include(s => s.Status).AsQueryable();

            elements = filterResults(elements, userParams);

            return await PagedList<Element>.CreateAsync(elements, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<PagedList<Element>> GetServicemanElements(int servicemanId, UserParams userParams)
        {
            var elements = _context.Elements.Where(e => e.ServicemanId == servicemanId).Include(n => n.Name).Include(s => s.Status).Include(s => s.Serviceman).AsQueryable();

            elements = filterResults(elements, userParams);

            return await PagedList<Element>.CreateAsync(elements, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<PagedList<Element>> GetUnassignedElements(UserParams userParams)
        {
            var elements = _context.Elements.Where(e => e.ServicemanId == null).Include(n => n.Name).Include(s => s.Status).Include(s => s.Serviceman).AsQueryable();

            elements = filterResults(elements, userParams);

            return await PagedList<Element>.CreateAsync(elements, userParams.PageNumber, userParams.PageSize);
        }

        private IQueryable<Element> filterResults(IQueryable<Element> elements, UserParams userParams)
        {
            elements = elements.OrderByDescending(u => u.Id);
            if (userParams.EquipmentId != null)
            {
                elements = elements.Where(e => e.EquipmentId == userParams.EquipmentId);
            }
            if (!string.IsNullOrEmpty(userParams.ServicemanName))
            {
                elements = elements.Where(e => e.Serviceman.UserName.ToLower().Contains(userParams.ServicemanName.ToLower()));
            }
            if (!string.IsNullOrEmpty(userParams.Name))
            {
                elements = elements.Where(r => r.Name.Name.Equals(userParams.Name));
            }
            if (userParams.Status != null)
            {
                elements = elements.Where(r => r.Status.Id == userParams.Status);
            }
            if (!string.IsNullOrEmpty(userParams.Description))
            {
                elements = elements.Where(r => r.Description.ToLower().Contains(userParams.Description.ToLower()));
            }
            if (userParams.WarrantyRepair != null)
            {
                elements = elements.Where(r => r.WarrantyRepair == userParams.WarrantyRepair);
            }
            if (userParams.MinNewWarrantyPeriod != null)
            {
                elements = elements.Where(r => r.NewWarrantyPeriod >= userParams.MinNewWarrantyPeriod);
            }
            if (userParams.MaxNewWarrantyPeriod != null)
            {
                elements = elements.Where(r => r.NewWarrantyPeriod <= userParams.MaxNewWarrantyPeriod.GetValueOrDefault().AddHours(24));
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy.ToLower())
                {
                    case "name":
                        elements = elements.OrderBy(r => r.Name.Name);
                        break;
                    case "status":
                        elements = elements.OrderBy(r => r.Status);
                        break;
                    case "newwarrantyperiod":
                        elements = elements.OrderBy(r => r.NewWarrantyPeriod);
                        break;
                    default:
                        elements = elements.OrderByDescending(r => r.Id);
                        break;
                }
            }
            return elements;
        }
    }
}