namespace PcService.API.Dtos
{
   public class EquipmentForUpdateDto
   {
      public int Id { get; set; }
      public int ClientId { get; set; }
      public string Name { get; set; }
      public string ProblemDescription { get; set; }
   }
}