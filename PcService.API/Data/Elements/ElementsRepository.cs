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

      public async Task<PagedList<Element>> GetEquipmentElements(int equipmentId, UserParams userParams)
      {
         var elements = _context.Elements.Where(e => e.EquipmentId == equipmentId);

         return await PagedList<Element>.CreateAsync(elements, userParams.PageNumber, userParams.PageSize);
      }

      public async Task<Element> GetElement(int id)
      {
         var element = await _context.Elements.FirstOrDefaultAsync(e => e.Id == id);

         return element;
      }

      public async Task<bool> SaveAll()
      {
         return await _context.SaveChangesAsync() > 0;
      }

      public async Task<PagedList<Element>> GetAllElements(int id, UserParams userParams)
      {
         var elements = _context.Elements;

         return await PagedList<Element>.CreateAsync(elements, userParams.PageNumber, userParams.PageSize); ;
      }
   }
}