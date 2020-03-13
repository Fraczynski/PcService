using System;

namespace PcService.API.Dtos
{
   public class EquipmentToReturnDto
   {
      public int Id { get; set; }
      public int ClientId { get; set; }
      public string Name { get; set; }
      public string ProblemDescription { get; set; }
      public DateTime ComplaintDate { get; set; }
      public DateTime ReleaseDate { get; set; }
   }
}