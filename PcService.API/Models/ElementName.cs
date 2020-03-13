using System.Collections.Generic;

namespace PcService.API.Models
{
   public class ElementName
   {
      public int Id { get; set; }
      public string Name { get; set; }
      public ICollection<Element> Elements { get; set; }
   }
}