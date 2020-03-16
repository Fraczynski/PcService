using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Equipments;
using PcService.API.Dtos;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class EquipmentsController : ControllerBase
   {
      private readonly IEquipmentsRepository _repo;
      private readonly IMapper _mapper;
      public EquipmentsController(IEquipmentsRepository repo, IMapper mapper)
      {
         _mapper = mapper;
         _repo = repo;
      }

      [HttpPost]
      [Authorize(Policy = "RequireSalesmanRole")]
      public async Task<IActionResult> AddEquipment(EquipmentForCreationDto equipmentForCreation)
      {
         var equipment = _mapper.Map<Equipment>(equipmentForCreation);

         _repo.Add(equipment);

         if (await _repo.SaveAll())
         {
            return Ok(equipment);
         }
         return BadRequest("Creating the repair failed on save");
      }

      [HttpGet]
      [Authorize(Policy = "RequireServicemanRole")]
      public async Task<IActionResult> GetAllEquipments([FromQuery]UserParams userParams)
      {
         var equipments = await _repo.GetAllEquipments(userParams);

         var equipmentsToReturn = _mapper.Map<IEnumerable<Equipment>>(equipments);

         Response.AddPagination(equipments.CurrentPage, equipments.PageSize, equipments.TotalCount, equipments.TotalPages);

         return Ok(equipmentsToReturn);
      }

      [HttpGet("{clientId}")]
      [Authorize(Policy = "RequireAuthorized")]
      public async Task<IActionResult> GetClientEquipments(int clientId, [FromQuery]UserParams userParams)
      {
         if (clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
         {
            var roles = User.FindAll(ClaimTypes.Role);
            var access = false;
            foreach (var role in roles)
            {
               if (role.Value == "Salesman" || role.Value == "Serviceman" || role.Value == "Administrator")
               {
                  access = true;
               }
            }
            if (access == false)
            {
               return Unauthorized();
            }
         }

         var equipments = await _repo.GetUserEquipments(clientId, userParams);

         var equipmentsToReturn = _mapper.Map<IEnumerable<EquipmentToReturnDto>>(equipments);

         Response.AddPagination(equipments.CurrentPage, equipments.PageSize, equipments.TotalCount, equipments.TotalPages);

         return Ok(equipmentsToReturn);
      }

      [HttpPut("{equipmentId}")]
      [Authorize(Policy = "RequireSalesmanRole")]
      public async Task<IActionResult> UpdateEquipment(int equipmentId, EquipmentForUpdateDto equipmentForUpdateDto)
      {
         var equipmentFromRepo = await _repo.GetEquipment(equipmentId);

         _mapper.Map(equipmentForUpdateDto, equipmentFromRepo);

         if (await _repo.SaveAll())
            return Ok(equipmentFromRepo);

         throw new Exception($"Updating equipment {equipmentId} failed on save");
      }

      [HttpPatch("{equipmentId}/assign")]
      [Authorize(Policy = "RequireClientRole")]
      public async Task<IActionResult> AssignUserToEquipment(int equipmentId, ClientForAssignDto clientForAssignDto)
      {
         var equipmentFromRepo = await _repo.GetEquipment(equipmentId);

         if (equipmentFromRepo.ClientId != null)
            return BadRequest("Invalid equipment ID");

         equipmentFromRepo.ClientId = clientForAssignDto.ClientId;

         if (await _repo.SaveAll())
            return Ok(equipmentFromRepo);

         throw new Exception($"Assigning equipment {equipmentId} to you failed on save");
      }

      [HttpPatch("{equipmentId}/status")]
      [Authorize(Policy = "RequireServicemanRole")]
      public async Task<IActionResult> UpdateStatus(int equipmentId, StatusForUpdateDto statusForUpdateDto)
      {
         var equipmentFromRepo = await _repo.GetEquipment(equipmentId);

         if (equipmentFromRepo == null)
         {
            return BadRequest("Equipment doesn't exist");
         }
         equipmentFromRepo.Status = statusForUpdateDto.Status;

         if (await _repo.SaveAll())
            return Ok(equipmentFromRepo);

         throw new Exception($"Updating equipment status failed on save");
      }
   }
}