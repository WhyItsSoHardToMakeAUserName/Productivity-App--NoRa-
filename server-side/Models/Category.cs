using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace server_side.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set;}
        public required int UserId { get; set;}
        public required string Name { get; set;}
        public string HexColor { get; set;} = "#ffffff";
        [JsonIgnore]
        public List<FinanceRecord>? FinanceRecords { get; set;} = [];
    }
}