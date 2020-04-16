using System;

namespace PcService.API.Dtos
{
    public class EquipmentForCreationDto
    {
        public EquipmentForCreationDto()
        {
            RequestDate = DateTime.Now;
            Status = "Zgłoszony";
        }
        public string ClientName { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string ProblemDescription { get; set; }
        public DateTime RequestDate { get; set; }
    }
}