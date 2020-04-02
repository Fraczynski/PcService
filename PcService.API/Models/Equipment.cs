using System;
using System.Collections.Generic;

namespace PcService.API.Models
{
    public class Equipment
    {
        public int Id { get; set; }
        public Nullable<int> ClientId { get; set; }
        public User Client { get; set; }
        public int EmployeeId { get; set; }
        public User Employee { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string ProblemDescription { get; set; }
        public DateTime RequestDate { get; set; }
        public Nullable<DateTime> ReleaseDate { get; set; }
        public ICollection<Element> Elements { get; set; }
    }
}