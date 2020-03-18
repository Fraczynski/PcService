using System.Collections.Generic;
using System.Threading.Tasks;
using PcService.API.Dtos;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Data.Elements
{
   public interface IElementsRepository
   {
      void Add<T>(T entity) where T : class;
      void Delete<T>(T entity) where T : class;
      Task<bool> SaveAll();
      Task<List<Element>> GetEquipmentElements(int equipmentId);
      Task<Element> GetElement(int id);
      Task<PagedList<Element>> GetAllElements(int id, UserParams userParams);
   }
}