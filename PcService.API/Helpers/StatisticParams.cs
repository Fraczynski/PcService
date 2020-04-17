using System;

namespace PcService.API.Helpers
{
    public class StatisticParams
    {
        public string ServicemanName { get; set; }
        public string SalesmanName { get; set; }
        public string ClientName { get; set; }
        public string ElementName { get; set; }
        public string ElementStatus { get; set; }
        public string EquipmentStatus { get; set; }
        public Nullable<bool> WarrantyRepair { get; set; }
        public Nullable<DateTime> MinEquipmentRequestDate { get; set; }
        public Nullable<DateTime> MaxEquipmentRequestDate { get; set; }
        public Nullable<DateTime> MinEquipmentReleaseDate { get; set; }
        public Nullable<DateTime> MaxEquipmentReleaseDate { get; set; }
    }
}