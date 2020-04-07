using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Statistics;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsRepository _repo;
        public StatisticsController(IStatisticsRepository repo)
        {
            _repo = repo;
        }

        [Authorize(Policy = "RequireServicemanRole")]
        [HttpGet("serviceman")]
        public async Task<IActionResult> GetServicemanStatistics([FromQuery] string type)
        {
            var servicemanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var statistics = await _repo.GetServicemanStatistics(servicemanId, type);

            return Ok(statistics);
        }

        [Authorize(Policy = "RequireAdministratorRole")]
        [HttpGet]
        public async Task<IActionResult> GetStatistics([FromQuery] string type)
        {
            var statistics = await _repo.GetStatistics(type);

            return Ok(statistics);
        }
    }
}