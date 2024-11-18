using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace server_side.Models
{
    public  class FinanceRecord{
        [Key]
        public int Id{get;set;}
        public int UserId{get;set;}
        
        [JsonIgnore]
        public FinanceTrackerData? FinanceTrackerData{get;set;}
        public int CategoryId {get;set;}

        [JsonIgnore]
        public Category? Category{get;set;}
        public required float Amount{get;set;}
        public string? Currency{get;set;} 
        public required bool IsProfit{get;set;}
        public DateTime DateCreated {get; private set;} = DateTime.UtcNow;
    }
}