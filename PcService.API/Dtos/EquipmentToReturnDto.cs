using System;

namespace PcService.API.Dtos
{
   public class EquipmentToReturnDto
   {
      public int Id { get; set; }
      public string ClientName { get; set; }
      public string Name { get; set; }
      public string Status { get; set; }
      public string ProblemDescription { get; set; }
      public DateTime RequestDate { get; set; }
      public Nullable<DateTime> ReleaseDate { get; set; }
   }
}