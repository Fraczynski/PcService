using System;

namespace PcService.API.Dtos
{
   public class ElementForUpdateDto
   {
      public int EquipmentId { get; set; }
      public Nullable<int> ServicemanId { get; set; }
      public int NameId { get; set; }
      public string Status { get; set; }
      public string Description { get; set; }
      public bool WarrantyRepair { get; set; }
      public Nullable<double> PartsCost { get; set; }
      public Nullable<double> ServiceCost { get; set; }
      public DateTime NewWarrantyPeriod { get; set; }
   }
}