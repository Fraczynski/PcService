using System;

namespace PcService.API.Dtos
{
   public class RepairToReturnDto
   {
      public int RepairId { get; set; }
      public string ElementName { get; set; }
      public string Result { get; set; }
      public string? Description { get; set; }
      public bool WarrantyRepair { get; set; }
      public DateTime? WarrantyExpiryDate { get; set; }
   }
}