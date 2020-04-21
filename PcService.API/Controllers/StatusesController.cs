using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Equipments;
using PcService.API.Data.Statuses;
using PcService.API.Dtos;

namespace PcService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatusesController : ControllerBase
    {
        private readonly IStatusesRepository _statusesRepo;
        private readonly IMapper _mapper;
        private readonly IEquipmentsRepository _equipmentsRepo;
        public StatusesController(IStatusesRepository statusesRepo, IEquipmentsRepository equipmentsRepo, IMapper mapper)
        {
            _equipmentsRepo = equipmentsRepo;
            _mapper = mapper;
            _statusesRepo = statusesRepo;
        }

        [HttpGet("client/{clientId}")]
        [Authorize(Policy = "RequireClientRole")]
        public async Task<IActionResult> GetClientEquipmentStatuses(int clientId)
        {
            var statusList = await _statusesRepo.GetClientEquipmentStatuses(clientId);

            var statusesToReturn = _mapper.Map<List<StatusToReturnDto>>(statusList);

            return Ok(statusesToReturn);
        }

        [HttpGet("salesman/{salesmanId}")]
        [Authorize(Policy = "RequireServicemanRole")]
        public async Task<IActionResult> GetServicemanEquipmentStatuses(int salesmanId)
        {
            var statusList = await _statusesRepo.GetSalesmanEquipmentStatuses(salesmanId);

            var statusesToReturn = _mapper.Map<List<StatusToReturnDto>>(statusList);

            return Ok(statusesToReturn);
        }

        [HttpGet("serviceman/{servicemanId}")]
        [Authorize(Policy = "RequireServicemanRole")]
        public async Task<IActionResult> GetServicemanElementStatuses(int servicemanId)
        {
            var statusList = await _statusesRepo.GetServicemanElementStatuses(servicemanId);

            var statusesToReturn = _mapper.Map<List<StatusToReturnDto>>(statusList);

            return Ok(statusesToReturn);
        }

        [HttpGet("equipments")]
        [Authorize(Policy = "RequireSalesmanRole")]
        public async Task<IActionResult> GetAllEquipmentStatuses()
        {
            var statusList = await _statusesRepo.GetAllEquipmentStatuses();

            var statusesToReturn = _mapper.Map<List<StatusToReturnDto>>(statusList);

            return Ok(statusesToReturn);
        }

        [HttpGet("elements")]
        [Authorize(Policy = "RequireServicemanRole")]
        public async Task<IActionResult> GetAllElementStatuses()
        {
            var statusList = await _statusesRepo.GetAllElementStatuses();

            var statusesToReturn = _mapper.Map<List<StatusToReturnDto>>(statusList);

            return Ok(statusesToReturn);
        }

        [HttpPatch("equipment")]
        [Authorize(Policy = "RequireSalesmanRole")]
        public async Task<IActionResult> UpdateEquipmentStatus(EquipmentStatusForUpdateDto equipmentStatusForUpdate)
        {
            var equipment = await _equipmentsRepo.GetEquipment(equipmentStatusForUpdate.EquipmentId);

            equipment.StatusId = equipmentStatusForUpdate.StatusId;

            if (await _equipmentsRepo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Błąd aktualizacji");
        }

    }
}