using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PcService.API.Dtos;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Data.ElementNames
{
    public class ElementNamesRepository : IElementNamesRepository
    {
        private readonly DataContext _context;
        public ElementNamesRepository(DataContext context)
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

        public async Task<ElementName> GetElementName(int id)
        {
            var elementName = await _context.ElementNames.FirstOrDefaultAsync(e => e.Id == id);

            return elementName;
        }

        public async Task<List<ElementName>> GetElementNames()
        {
            var elementNames = await _context.ElementNames.ToListAsync();

            return elementNames;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}