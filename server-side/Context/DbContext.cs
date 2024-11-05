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
        public required DbSet<FinanceRecord> FinanceRecords {get;set;}
        public required DbSet<Category> Categories {get;set;}
        public required DbSet<User> Users {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<FinanceTrackerData>()
                .Property(ft => ft.BackgroundOpacity)
                .HasDefaultValue(0.4);

            modelBuilder.Entity<FinanceTrackerData>()
                .Property(ft => ft.BorderOpacity)
                .HasDefaultValue(0.8);

            modelBuilder.Entity<FinanceRecord>()
                .HasOne(d => d.Category)
                .WithMany(c => c.FinanceRecords)
                .HasForeignKey(d => d.CategoryId);
            
            modelBuilder.Entity<FinanceTrackerData>()
                .HasOne(d => d.User)
                .WithOne(f => f.FinanceTrackerData)
                .HasForeignKey<FinanceTrackerData>(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FinanceRecord>()
                .HasOne(f => f.FinanceTrackerData)
                .WithMany(r => r.FinanceRecords)
                .HasForeignKey(r => r.UserId);

            
            

            base.OnModelCreating(modelBuilder);
        }
    }
}