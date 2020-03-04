using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PcService.API.Models;

namespace PcService.API.Data
{
   public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
   {
      public DataContext(DbContextOptions<DataContext> options) : base(options) { }

      public DbSet<Repair> Repairs { get; set; }

      protected override void OnModelCreating(ModelBuilder builder)
      {
         base.OnModelCreating(builder);
         builder.Entity<UserRole>(userRole =>
         {
            userRole.HasKey(ur => new { ur.UserId, ur.RoleId });
            userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId).IsRequired();
            userRole.HasOne(ur => ur.User).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.UserId).IsRequired();
         });
         builder.Entity<Repair>()
             .HasKey(k => new { k.RepairId });
         builder.Entity<Repair>()
                   .HasOne(r => r.Client)
                   .WithMany(u => u.Repairs)
                   .HasForeignKey(u => u.ClientId)
                   .OnDelete(DeleteBehavior.Restrict);

         builder.Entity<Repair>()
                   .HasOne(u => u.Employee)
                   .WithMany(u => u.EmployeeRepairs)
                   .HasForeignKey(u => u.EmployeeId)
                   .OnDelete(DeleteBehavior.Restrict);
      }
   }
}