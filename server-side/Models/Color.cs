using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server_side.Models
{
    public class Color
    {
        [Key]
        public int Id { get; set;}
        public int FinanceDataId {get;set;}
        public int Red{ get; set;}
        public int Green{ get; set;}
        public int Blue{ get; set;}
    }
}