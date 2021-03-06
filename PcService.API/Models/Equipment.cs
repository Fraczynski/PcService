using System;
using System.Collections.Generic;

namespace PcService.API.Models
{
    public class Equipment
    {
        public Equipment()
        {
            StatusId = 1;
        }
        public int Id { get; set; }
        public Nullable<int> ClientId { get; set; }
        public User Client { get; set; }
        public int EmployeeId { get; set; }
        public User Employee { get; set; }
        public string Name { get; set; }
        public int StatusId { get; set; }
        public EquipmentStatus Status { get; set; }
        public string ProblemDescription { get; set; }
        public DateTime RequestDate { get; set; }
        public Nullable<DateTime> ReleaseDate { get; set; }
        public ICollection<Element> Elements { get; set; }
        public string InvoiceId { get; set; }
    }

}