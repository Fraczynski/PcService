using System;

namespace PcService.API.Helpers
{
   public class UserParams
   {
      private const int MaxPageSize = 50;
      public int PageNumber { get; set; } = 1;
      private int pageSize = 10;
      public int PageSize
      {
         get { return pageSize; }
         set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
      }

      public int? RepairId { get; set; }
      public string ElementName { get; set; }
      public string Result { get; set; }
      public bool? WarrantyRepair { get; set; }
      public DateTime? MinWarrantyExpiryDate { get; set; }
      public DateTime? MaxWarrantyExpiryDate { get; set; }
      public string OrderBy { get; set; }
   }
}