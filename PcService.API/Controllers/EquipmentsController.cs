using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Equipments;
using PcService.API.Data.Users;
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
        private readonly IUsersRepository _usersRepo;
        public EquipmentsController(IEquipmentsRepository repo, IMapper mapper, IUsersRepository usersRepo)
        {
            _usersRepo = usersRepo;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        [Authorize(Policy = "RequireSalesmanRole")]
        public async Task<IActionResult> AddEquipment(EquipmentForCreationDto equipmentForCreationDto)
        {
            var equipment = _mapper.Map<Equipment>(equipmentForCreationDto);

            if (equipmentForCreationDto.ClientName != null && equipmentForCreationDto.ClientName != "")
            {
                var client = await _usersRepo.GetUser(equipmentForCreationDto.ClientName);

                if (client == null)
                {
                    return BadRequest("User doesn't exist");
                }
                equipment.ClientId = client.Id;
            }

            equipment.EmployeeId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            _repo.Add(equipment);

            if (await _repo.SaveAll())
            {
                return Ok(equipment.Id);
            }
            return BadRequest("Creating the repair failed on save");
        }

        [HttpGet]
        [Authorize(Policy = "RequireSalesmanRole")]
        public async Task<IActionResult> GetAllEquipments([FromQuery] UserParams userParams)
        {
            var equipments = await _repo.GetAllEquipments(userParams);

            var equipmentsToReturn = _mapper.Map<IEnumerable<EquipmentToReturnDto>>(equipments);

            Response.AddPagination(equipments.CurrentPage, equipments.PageSize, equipments.TotalCount, equipments.TotalPages);

            return Ok(equipmentsToReturn);
        }

        [HttpGet("{equipmentId}")]
        [Authorize(Policy = "RequireEmployeeRole")]
        public async Task<IActionResult> GetEquipment(int equipmentId)
        {
            var equipment = await _repo.GetEquipment(equipmentId);

            var equipmentToReturn = _mapper.Map<EquipmentToReturnDto>(equipment);

            return Ok(equipmentToReturn);
        }

        [HttpGet("client/{clientId}")]
        [Authorize(Policy = "RequireAuthorized")]
        public async Task<IActionResult> GetClientEquipments(int clientId, [FromQuery] UserParams userParams)
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
            equipmentFromRepo.StatusId = statusForUpdateDto.StatusId;

            if (await _repo.SaveAll())
                return Ok(equipmentFromRepo);

            throw new Exception($"Updating equipment status failed on save");
        }

        [HttpGet("{clientId}/statusList")]
        [Authorize(Policy = "RequireAuthorized")]
        public async Task<IActionResult> GetClientEquipmentsStatusList(int clientId)
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

            var statusList = await _repo.GetClientEquipmentsStatusList(clientId);

            return Ok(statusList);
        }

        [HttpGet("statusList")]
        [Authorize(Policy = "RequireEmployeeRole")]
        public async Task<IActionResult> GetAllEquipmentsStatusList()
        {
            var statusList = await _repo.GetAllEquipmentsStatusList();

            return Ok(statusList);
        }

        [HttpPatch("release")]
        [Authorize(Policy = "RequireSalesmanRole")]
        public async Task<IActionResult> ReleaseEquipment(EquipmentForReleaseDto equipmentForReleaseDto)
        {
            var equipmentFromRepo = await _repo.GetEquipment(equipmentForReleaseDto.Id);

            if (equipmentFromRepo == null)
            {
                return BadRequest("Equipment doesn't exist");
            }
            equipmentFromRepo.ReleaseDate = DateTime.Now;

            if (await _repo.SaveAll())
                return Ok(equipmentFromRepo);

            throw new Exception($"Updating equipment failed on save");
        }

        [HttpPatch("{equipmentId}/repair")]
        [Authorize(Policy = "RequireSalesmanRole")]
        public async Task<IActionResult> RepairEquipment(int equipmentId)
        {
            var equipmentFromRepo = await _repo.GetEquipment(equipmentId);

            if (equipmentFromRepo == null)
            {
                return BadRequest("Equipment doesn't exist");
            }

            if (await _repo.SaveAll())
                return Ok(equipmentFromRepo);

            throw new Exception($"Updating equipment failed on save");
        }
    }
}