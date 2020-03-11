using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Repairs;

namespace PcService.API.Controllers
{
   [ApiController]
   //    [Authorize(Policy = "RequireAdminRole")]
   [AllowAnonymous]
   [Route("api/[controller]")]
   public class StatisticsController : ControllerBase
   {
      private readonly IRepairsRepository _repo;
      public StatisticsController(IRepairsRepository repo)
      {
         _repo = repo;
      }

      [HttpGet]
      public async Task<IActionResult> GetStatistics(string type)
      {
         var repairs = await _repo.GetRepairs();

         var dictionary = new Dictionary<string, int>();

         switch (type.ToLower())
         {
            case "elementname":
               foreach (var repair in repairs)
               {
                  var elementName = repair.ElementName.ToLower();
                  if (dictionary.ContainsKey(elementName))
                  {
                     dictionary[elementName]++;
                  }
                  else
                  {
                     dictionary.Add(elementName, 1);
                  }
               }
               break;
            case "result":
               foreach (var repair in repairs)
               {
                  var result = repair.Result;
                  if (dictionary.ContainsKey(result))
                  {
                     dictionary[result]++;
                  }
                  else
                  {
                     dictionary.Add(result, 1);
                  }
               }
               break;
            case "warrantyrepair":
               foreach (var repair in repairs)
               {
                  var warrantyrepair = repair.WarrantyRepair;
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
            case "employeeid":
               foreach (var repair in repairs)
               {
                  var employeeId = repair.EmployeeId;
                  if (dictionary.ContainsKey(employeeId.ToString()))
                  {
                     dictionary[employeeId.ToString()]++;
                  }
                  else
                  {
                     dictionary.Add(employeeId.ToString(), 1);
                  }
               }
               break;
         }

         var statistics = new List<(string, int)>();

         foreach (var key in dictionary.Keys)
         {
            statistics.Add((key, dictionary[key]));
         }

         return Ok(statistics);
      }
   }
}