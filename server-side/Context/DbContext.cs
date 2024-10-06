using Microsoft.EntityFrameworkCore;
using server_side.Models;

namespace server_side.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        :base(options)
        {
        }

        public required DbSet<FinanceTrackerData> FinanceTrackerData {get;set;}
        public required DbSet<FinanceData> FinanceData {get;set;}
        public required DbSet<Color> Colors {get;set;}
        public required DbSet<User> Users {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Models.FinanceTrackerData>()
                .Property(ft => ft.BackgroundOpacity)
                .HasDefaultValue(0.4);

            modelBuilder.Entity<Models.FinanceTrackerData>()
                .Property(ft => ft.BorderOpacity)
                .HasDefaultValue(0.8);

            base.OnModelCreating(modelBuilder);
        }
    }
}