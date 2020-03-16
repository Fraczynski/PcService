using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
   // [Authorize(Policy = "RequireSalesmanRole")]
   [AllowAnonymous]
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
      // [Authorize(Policy = "RequireEmployeeRole")]
      public async Task<IActionResult> GetAllEquipments(UserParams userParams)
      {
         var equipments = await _repo.GetAllEquipments(userParams);

         var equipmentsToReturn = _mapper.Map<IEnumerable<Equipment>>(equipments);

         return Ok(equipmentsToReturn);
      }

      [HttpGet("{userId}")]
      public async Task<IActionResult> GetUserEquipments(int userId, UserParams userParams)
      {
         var equipments = await _repo.GetUserEquipments(userId, userParams);

         var equipmentsToReturn = _mapper.Map<IEnumerable<EquipmentToReturnDto>>(equipments);

         return Ok(equipmentsToReturn);
      }

      [HttpPut]
      public async Task<IActionResult> UpdateEquipment(int id, EquipmentForUpdateDto equipmentForUpdateDto)
      {
         var equipmentFromRepo = await _repo.GetEquipment(id);

         _mapper.Map(equipmentForUpdateDto, equipmentFromRepo);

         if (await _repo.SaveAll())
            return Ok(equipmentFromRepo);

         throw new Exception($"Updating equipment {id} failed on save");
      }
   }
}