using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Repairs;
using PcService.API.Dtos;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Controllers
{
   [ApiController]
   [Authorize(Policy = "RequireClientRole")]
   [Route("api/[controller]")]
   public class RepairsController : ControllerBase
   {
      private readonly IRepairsRepository _repo;
      private readonly IMapper _mapper;
      public RepairsController(IRepairsRepository repo, IMapper mapper)
      {
         _mapper = mapper;
         _repo = repo;
      }

      [Authorize(Policy = "RequireServicemanRole")]
      [HttpGet]
      public async Task<IActionResult> GetRepairs([FromQuery]UserParams userParams)
      {
         var repairs = await _repo.GetRepairs(userParams);

         var repairsToReturn = _mapper.Map<IEnumerable<RepairToReturnDto>>(repairs);

         Response.AddPagination(repairs.CurrentPage, repairs.PageSize, repairs.TotalCount, repairs.TotalPages);

         return Ok(repairsToReturn);
      }

      [HttpGet("{userId}")]
      public async Task<IActionResult> GetRepairsForUser([FromQuery]UserParams userParams, int userId, bool client = true)
      {
         var repairs = await _repo.GetRepairsForUser(userParams, userId, client);

         var repairsToReturn = _mapper.Map<IEnumerable<RepairToReturnDto>>(repairs);

         Response.AddPagination(repairs.CurrentPage, repairs.PageSize, repairs.TotalCount, repairs.TotalPages);

         return Ok(repairsToReturn);
      }

      [HttpPost]
      [Authorize(Policy = "RequireServicemanRole")]
      public async Task<IActionResult> AddRepair(RepairForCreationDto repairForCreationDto)
      {
         var employeeId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

         repairForCreationDto.EmployeeId = employeeId;

         var repair = _mapper.Map<Repair>(repairForCreationDto);

         _repo.Add(repair);

         if (await _repo.SaveAll())
         {
            return Ok(repair.RepairId);
         }
         return BadRequest("Creating the repair failed on save");
      }

      [HttpPut("{userId}")]
      public async Task<IActionResult> AssignRepairToUser(int userId, RepairForAssignUserDto number)
      {
         if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

         var repair = await _repo.GetRepairByNumber(number.repairNumber);

         if (repair == null)
         {
            return BadRequest("Invalid number");
         }

         repair.ClientId = userId;

         if (await _repo.SaveAll())
         {
            var repairToReturn = _mapper.Map<RepairToReturnDto>(repair);
            return Ok(repair);
         }
         return BadRequest("Assigning the repair failed on save");
      }

      [HttpGet("elementNames")]
      public async Task<IActionResult> GetElementNames()
      {
         var elementNames = await _repo.GetElementNames();

         return Ok(elementNames);
      }

      [HttpGet("resultOptions")]
      public async Task<IActionResult> GetResultOptions()
      {
         var resultOptions = await _repo.GetResultOptions();

         return Ok(resultOptions);
      }
   }
}