using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.ElementNames;
using PcService.API.Dtos;
using PcService.API.Models;

namespace PcService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ElementNamesController : ControllerBase
    {
        private readonly IElementNamesRepository _repo;
        private readonly IMapper _mapper;
        public ElementNamesController(IElementNamesRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        [Authorize(Policy = "RequireEmployeeRole")]
        public async Task<IActionResult> AddName(ElementNameForCreationDto elementNameForCreation)
        {
            var elementName = _mapper.Map<ElementName>(elementNameForCreation);

            _repo.Add(elementName);

            if (await _repo.SaveAll())
            {
                var elementNameToReturn = _mapper.Map<ElementNameToReturnDto>(elementName);
                return Ok(elementNameToReturn);
            }
            return BadRequest("Creating the name failed on save");
        }

        [HttpGet]
        [Authorize(Policy = "RequireEmployeeRole")]
        public async Task<IActionResult> GetElementNames()
        {
            var elementNames = await _repo.GetElementNames();

            var elementNamesToReturn = _mapper.Map<IEnumerable<ElementNameToReturnDto>>(elementNames);

            return Ok(elementNamesToReturn);
        }
    }
}