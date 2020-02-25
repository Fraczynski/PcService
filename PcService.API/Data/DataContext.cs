using Microsoft.EntityFrameworkCore;
using PcService.API.Models;

namespace PcService.API.Data
{
     public class DataContext : DbContext
     {
          public DataContext(DbContextOptions<DataContext> options) : base(options) { }
          public DbSet<User> Users { get; set; }
     }
}