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

        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Element> Elements { get; set; }
        public DbSet<ElementName> ElementNames { get; set; }
        public DbSet<ElementStatus> ElementStatuses { get; set; }
        public DbSet<EquipmentStatus> EquipmentStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });
                userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId).IsRequired();
                userRole.HasOne(ur => ur.User).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.UserId).IsRequired();
            });
            builder.Entity<Equipment>().HasKey(k => new { k.Id });
            builder.Entity<Equipment>()
                      .HasOne(r => r.Client)
                      .WithMany(u => u.OwnedEquipments)
                      .HasForeignKey(u => u.ClientId)
                      .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Equipment>()
                      .HasOne(r => r.Employee)
                      .WithMany(u => u.AssignedEquipments)
                      .HasForeignKey(u => u.EmployeeId)
                      .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Equipment>()
                      .HasOne(r => r.Status)
                      .WithMany(u => u.Equipments)
                      .HasForeignKey(u => u.StatusId)
                      .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Element>().HasKey(k => new { k.Id });
            builder.Entity<Element>()
                      .HasOne(r => r.Equipment)
                      .WithMany(u => u.Elements)
                      .HasForeignKey(u => u.EquipmentId)
                      .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Element>()
                      .HasOne(r => r.Name)
                      .WithMany(u => u.Elements)
                      .HasForeignKey(u => u.NameId)
                      .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Element>()
                      .HasOne(r => r.Status)
                      .WithMany(u => u.Elements)
                      .HasForeignKey(u => u.StatusId)
                      .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ElementName>().HasKey(k => new { k.Id });

            builder.Entity<ElementStatus>().HasKey(k => new { k.Id });

            builder.Entity<EquipmentStatus>().HasKey(k => new { k.Id });
        }
    }
}