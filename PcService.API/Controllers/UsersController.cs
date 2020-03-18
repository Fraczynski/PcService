using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Users;

namespace PcService.API.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class UsersController : ControllerBase
   {
      private readonly IUsersRepository _repo;
      public UsersController(IUsersRepository repo)
      {
         _repo = repo;
      }

      [HttpGet("{clientName}")]
      [Authorize(Policy = "RequireSalesmanRole")]
      public async Task<IActionResult> CheckUserExists(string clientName)
      {
         var user = await _repo.GetUser(clientName);

         if (user == null)
         {
            return NotFound();
         }
         return NoContent();
      }
   }
}