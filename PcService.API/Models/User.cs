using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace PcService.API.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<Equipment> OwnedEquipments { get; set; }
        public ICollection<Equipment> AssignedEquipments { get; set; }
    }
}