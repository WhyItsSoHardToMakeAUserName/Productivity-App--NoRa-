using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace server_side.Models
{
    public class User
    {
        [Key]
        public int Id {get;set;}
        public required string Username {get;set;} 
        public required string Password {get;set;}
        public required string Email {get;set;}
        [JsonIgnore]
        public FinanceTrackerData FinanceTrackerData {get;set;}

        public User()
    {
        FinanceTrackerData = new FinanceTrackerData{User = this}; // Initialize in constructor
    }
    }
}