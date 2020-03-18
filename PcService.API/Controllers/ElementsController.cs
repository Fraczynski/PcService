using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Elements;
using PcService.API.Data.Equipments;
using PcService.API.Dtos;
using PcService.API.Helpers;
using PcService.API.Models;

namespace PcService.API.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class ElementsController : ControllerBase
   {
      private readonly IElementsRepository _repo;
      private readonly IMapper _mapper;
      public ElementsController(IElementsRepository repo, IMapper mapper)
      {
         _mapper = mapper;
         _repo = repo;
      }

      [HttpPost]
      [Authorize(Policy = "RequireSalesmanRole")]
      public async Task<IActionResult> AddElement(ElementForCreationDto elementForCreation)
      {
         var element = _mapper.Map<Element>(elementForCreation);

         element.ServicemanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

         _repo.Add(element);

         if (await _repo.SaveAll())
         {
            return Ok(element);
         }
         return BadRequest("Creating the repair failed on save");
      }

      [HttpGet]
      [Authorize(Policy = "RequireServicemanRole")]
      public async Task<IActionResult> GetAllElements(int equipmentId, UserParams userParams)
      {
         var elements = await _repo.GetAllElements(equipmentId, userParams);

         return Ok(elements);
      }

      [HttpGet("equipment/{equipmentId}")]
      [Authorize(Policy = "RequireAuthorized")]
      public async Task<IActionResult> GetEquipmentElements(int equipmentId)
      {
         var elements = await _repo.GetEquipmentElements(equipmentId);

         var elementsToReturn = _mapper.Map<IEnumerable<ElementToReturnDto>>(elements);

         return Ok(elementsToReturn);
      }

      [HttpGet("{id}")]
      [Authorize(Policy = "RequireServicemanRole")]
      public async Task<IActionResult> GetElement(int id)
      {
         var element = await _repo.GetElement(id);

         return Ok(element);
      }

      [HttpPut("{id}")]
      [Authorize(Policy = "RequireEmployeeRole")]
      public async Task<IActionResult> UpdateElement(int id, ElementForUpdateDto elementForUpdateDto)
      {
         var elementFromRepo = await _repo.GetElement(id);

         _mapper.Map(elementForUpdateDto, elementFromRepo);

         if (await _repo.SaveAll())
            return Ok(elementFromRepo);

         throw new Exception($"Updating element {id} failed on save");
      }
   }
}