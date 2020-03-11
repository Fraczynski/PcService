using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace PcService.API.Models
{
   public class Repair
   {
      public int RepairId { get; set; }
      public int? ClientId { get; set; }
      public User? Client { get; set; }
      public int EmployeeId { get; set; }
      public User Employee { get; set; }
      public string ElementName { get; set; }
      public string Result { get; set; }
      public string? Description { get; set; }
      public bool WarrantyRepair { get; set; }
      public DateTime? WarrantyExpiryDate { get; set; }
      public ICollection<Message> ClientMessages { get; set; }
      public ICollection<Message> EmployeeMessages { get; set; }
   }
}