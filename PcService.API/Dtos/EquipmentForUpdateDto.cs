using System;

namespace PcService.API.Dtos
{
    public class EquipmentForUpdateDto
    {
        public int ClientId { get; set; }
        public string Name { get; set; }
        public int StatusId { get; set; }
        public string ProblemDescription { get; set; }
        public DateTime RequestDate { get; set; }
        public Nullable<DateTime> ReleaseDate { get; set; }
    }
}