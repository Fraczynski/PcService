using System.Collections.Generic;

namespace PcService.API.Models
{
    public class EquipmentStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Equipment> Equipments { get; set; }
    }
}