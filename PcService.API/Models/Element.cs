using System;

namespace PcService.API.Models
{
    public class Element
    {
        public int Id { get; set; }
        public int EquipmentId { get; set; }
        public Equipment Equipment { get; set; }
        public Nullable<int> ServicemanId { get; set; }
        public User Serviceman { get; set; }
        public int NameId { get; set; }
        public ElementName Name { get; set; }
        public int StatusId { get; set; }
        public ElementStatus Status { get; set; }
        public string Description { get; set; }
        public bool WarrantyRepair { get; set; }
        public Nullable<double> PartsCost { get; set; }
        public Nullable<double> ServiceCost { get; set; }
        public Nullable<DateTime> NewWarrantyPeriod { get; set; }

        public Element()
        {
            WarrantyRepair = false;
        }
    }
}