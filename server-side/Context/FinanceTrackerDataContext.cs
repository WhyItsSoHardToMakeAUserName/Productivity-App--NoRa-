using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace server_side.Context
{
    public class FinanceTrackerDataContext : DbContext
    {
        public FinanceTrackerDataContext(DbContextOptions<FinanceTrackerDataContext> options)
        :base(options)
        {
        }

        public DbSet<Models.FinanceTrackerData> FinanceTrackerData {get;set;}
        public DbSet<Models.Color> Colors {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<Models.FinanceTrackerData>()
                .Property(ft => ft.BackgroundOpacity)
                .HasDefaultValue(0.4);

            modelBuilder.Entity<Models.FinanceTrackerData>()
                .Property(ft => ft.BorderOpacity)
                .HasDefaultValue(0.8);
        }
    }
}