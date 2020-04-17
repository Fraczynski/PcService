using System;

namespace PcService.API.Dtos
{
    public class ElementToReturnDto
    {
        public int Id { get; set; }
        public int EquipmentId { get; set; }
        public string ServicemanName { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public bool WarrantyRepair { get; set; }
        public Nullable<double> PartsCost { get; set; }
        public Nullable<double> ServiceCost { get; set; }
        public Nullable<DateTime> NewWarrantyPeriod { get; set; }
    }
}