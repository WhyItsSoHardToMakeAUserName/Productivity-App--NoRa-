using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server_side.Models
{
    public  class FinanceData{
        [Key]
        public int Id{get;set;}
        public int FinanceTrackerDataId{get;set;}
        public Color? Color {get;set;}
        public string? Category{get;set;}
        public required float Amount{get;set;}
        public string? Currency{get;set;} 
        public required bool profit{get;set;}
    }
}