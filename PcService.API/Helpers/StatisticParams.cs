using System;

namespace PcService.API.Helpers
{
    public class StatisticParams
    {
        public string ServicemanName { get; set; }
        public string SalesmanName { get; set; }
        public string ClientName { get; set; }
        public Nullable<int> ElementName { get; set; }
        public Nullable<int> ElementStatus { get; set; }
        public Nullable<int> EquipmentStatus { get; set; }
        public Nullable<bool> WarrantyRepair { get; set; }
        public Nullable<DateTime> MinEquipmentRequestDate { get; set; }
        public Nullable<DateTime> MaxEquipmentRequestDate { get; set; }
        public Nullable<DateTime> MinEquipmentReleaseDate { get; set; }
        public Nullable<DateTime> MaxEquipmentReleaseDate { get; set; }
    }
}