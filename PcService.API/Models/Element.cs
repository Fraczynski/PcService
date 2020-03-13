using System;

namespace PcService.API.Models
{
   public class Element
   {
      public int Id { get; set; }
      public int EquipmentId { get; set; }
      public Equipment Equipment { get; set; }
      public int ServicemanId { get; set; }
      public User Serviceman { get; set; }
      public int NameId { get; set; }
      public ElementName Name { get; set; }
      public string Status { get; set; }
      public string Description { get; set; }
      public bool WarrantyRepair { get; set; }
      public DateTime NewWarrantyPeriod { get; set; }
   }
}