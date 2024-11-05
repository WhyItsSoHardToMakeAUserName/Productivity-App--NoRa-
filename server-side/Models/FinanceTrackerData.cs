using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace server_side.Models
{
    public class FinanceTrackerData()
    {
        [Key]
        public int UserId{get;set;}
        public required User User { get; set; }
        public float BackgroundOpacity{get;set;}
        public float BorderOpacity{get;set;}
        public List<FinanceRecord> FinanceRecords{get;set;} = [];
    }

}