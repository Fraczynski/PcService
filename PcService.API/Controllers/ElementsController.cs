using System;
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
   [Route("api/equipment/[controller]")]
   [Authorize(Policy = "RequireServicemanRole")]
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
      public async Task<IActionResult> GetAllElements(int equipmentId, UserParams userParams)
      {
         var elements = await _repo.GetAllElements(equipmentId, userParams);

         return Ok(elements);
      }

      [HttpGet("{equipmentId}")]
      public async Task<IActionResult> GetEquipmentElements(int equipmentId, UserParams userParams)
      {
         var elements = await _repo.GetEquipmentElements(equipmentId, userParams);

         return Ok(elements);
      }

      [HttpGet("{id}")]
      public async Task<IActionResult> GetElement(int id)
      {
         var element = await _repo.GetElement(id);

         return Ok(element);
      }

      [HttpPut("{id}")]
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