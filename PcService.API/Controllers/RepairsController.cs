using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data;
using PcService.API.Dtos;
using PcService.API.Models;

namespace PcService.API.Controllers
{
   [ApiController]
   [Route("api/[controller]")]
   public class RepairsController : ControllerBase
   {
      private readonly IServiceRepository _repo;
      private readonly IMapper _mapper;
      public RepairsController(IServiceRepository repo, IMapper mapper)
      {
         _mapper = mapper;
         _repo = repo;
      }

      [Authorize(Policy = "RequireModeratorRole")]
      [HttpGet]
      public async Task<IActionResult> GetRepairs()
      {
         var repairs = await _repo.GetRepairs();

         var repairsToReturn = _mapper.Map<IEnumerable<RepairToReturnDto>>(repairs);

         return Ok(repairsToReturn);
      }

      [Authorize]
      [HttpGet("{userId}")]
      public async Task<IActionResult> GetRepairsForUser(int userId, bool client = true)
      {
         var repairs = await _repo.GetRepairsForUser(userId, client);

         var repairsToReturn = _mapper.Map<IEnumerable<RepairToReturnDto>>(repairs);

         return Ok(repairsToReturn);
      }

      [HttpPost]
      [Authorize(Policy = "RequireModeratorRole")]
      public async Task<IActionResult> AddRepair(RepairForCreationDto repairForCreationDto)
      {
         var employeeId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

         var employee = await _repo.GetUser(employeeId);

         repairForCreationDto.EmployeeId = employeeId;

         var repair = _mapper.Map<Repair>(repairForCreationDto);

         _repo.Add(repair);

         if (await _repo.SaveAll())
         {
            var repairToReturn = _mapper.Map<RepairToReturnDto>(repair);
            return Ok(repair);
         }
         return BadRequest("Creating the repair failed on save");
      }

      [HttpPut("{userId}")]
      [Authorize]
      public async Task<IActionResult> AssignRepairToUser(int userId, RepairForAssignUserDto number)
      {
         if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

         var client = await _repo.GetUser(userId);

         var repair = await _repo.GetRepairByNumber(number.repairNumber);

         if (repair == null)
         {
            return BadRequest("Invalid number");
         }

         repair.ClientId = userId;
         repair.Client = client;

         if (await _repo.SaveAll())
         {
            var repairToReturn = _mapper.Map<RepairToReturnDto>(repair);
            return Ok(repair);
         }
         return BadRequest("Assigning the repair failed on save");
      }
   }
}