using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server_side.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set;}
        public int UserId { get; set;}
        public required string Name { get; set;}
        public int Red{ get; set;} =12;
        public int Green{ get; set;}
        public int Blue{ get; set;}
        public List<FinanceRecord> FinanceRecords { get; set;} = new List<FinanceRecord>();
    }
}