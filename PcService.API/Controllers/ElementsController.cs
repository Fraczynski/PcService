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

            _repo.Add(element);

            if (await _repo.SaveAll())
            {
                var elementToReturn = _mapper.Map<ElementToReturnDto>(element);
                return Ok(elementToReturn);
            }
            return BadRequest("Creating the repair failed on save");
        }

        [HttpGet]
        [Authorize(Policy = "RequireServicemanRole")]
        public async Task<IActionResult> GetAllElements([FromQuery] UserParams userParams)
        {
            var elements = await _repo.GetAllElements(userParams);

            var elementsToReturn = _mapper.Map<IEnumerable<ElementToReturnDto>>(elements);

            Response.AddPagination(elements.CurrentPage, elements.PageSize, elements.TotalCount, elements.TotalPages);

            return Ok(elementsToReturn);
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

            var elementToReturn = _mapper.Map<ElementToReturnDto>(element);

            return Ok(elementToReturn);
        }

        [HttpPut]
        [Authorize(Policy = "RequireEmployeeRole")]
        public async Task<IActionResult> UpdateElement(ElementForUpdateDto elementForUpdateDto)
        {
            var elementFromRepo = await _repo.GetElement(elementForUpdateDto.Id);

            elementFromRepo.Status = elementForUpdateDto.Status;
            elementFromRepo.Description = elementForUpdateDto.Description;
            elementFromRepo.WarrantyRepair = elementForUpdateDto.WarrantyRepair;
            elementFromRepo.PartsCost = elementForUpdateDto.PartsCost;
            elementFromRepo.ServiceCost = elementForUpdateDto.ServiceCost;
            elementFromRepo.NewWarrantyPeriod = elementForUpdateDto.NewWarrantyPeriod;

            if (await _repo.SaveAll())
                return Ok(elementFromRepo);

            throw new Exception($"Updating element {elementForUpdateDto.Id} failed on save");
        }

        [HttpPatch("assign")]
        [Authorize(Policy = "RequireEmployeeRole")]
        public async Task<IActionResult> AssignElementToServiceman(IdForAssignDto idForAssignDto)
        {
            var servicemanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var element = await _repo.GetElement(idForAssignDto.Id);

            if (element == null || element.ServicemanId != null)
            {
                return BadRequest("Cannot assign this element");
            }

            element.ServicemanId = servicemanId;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating element {idForAssignDto.Id} failed on save");
        }

        [HttpGet("serviceman")]
        [Authorize(Policy = "RequireServicemanRole")]
        public async Task<IActionResult> GetServicemanElements([FromQuery] UserParams userParams)
        {
            var servicemanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var elements = await _repo.GetServicemanElements(servicemanId, userParams);

            var elementsToReturn = _mapper.Map<IEnumerable<ElementToReturnDto>>(elements);

            Response.AddPagination(elements.CurrentPage, elements.PageSize, elements.TotalCount, elements.TotalPages);

            return Ok(elementsToReturn);
        }

        [HttpGet("unassigned")]
        [Authorize(Policy = "RequireServicemanRole")]
        public async Task<IActionResult> GetUnassignedElements([FromQuery] UserParams userParams)
        {
            var elements = await _repo.GetUnassignedElements(userParams);

            var elementsToReturn = _mapper.Map<IEnumerable<ElementToReturnDto>>(elements);

            Response.AddPagination(elements.CurrentPage, elements.PageSize, elements.TotalCount, elements.TotalPages);

            return Ok(elementsToReturn);
        }
    }
}