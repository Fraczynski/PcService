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
      public string OrderBy { get; set; }
      public string ClientName { get; set; }
      public string Name { get; set; }
      public string Status { get; set; }
      public string ProblemDescription { get; set; }
      public Nullable<DateTime> MinRequestDate { get; set; }
      public Nullable<DateTime> MaxRequestDate { get; set; }
      public Nullable<DateTime> MinReleaseDate { get; set; }
      public Nullable<DateTime> MaxReleaseDate { get; set; }
   }
}