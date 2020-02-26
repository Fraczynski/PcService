using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace PcService.API.Models
{
     public class User : IdentityUser<int>
     {
          public ICollection<UserRole> UserRoles { get; set; }
     }
}