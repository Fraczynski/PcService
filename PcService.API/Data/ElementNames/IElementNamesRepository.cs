using System.Collections.Generic;
using System.Threading.Tasks;
using PcService.API.Dtos;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Data.ElementNames
{
    public interface IElementNamesRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<List<ElementName>> GetElementNames();
        Task<ElementName> GetElementName(int id);
    }
}