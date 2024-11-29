using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server_side.Models
{
    public class EditLog
    {
        [Key]
        public int Id { get; set; }
        public int FinanceRecordId { get; set; }
        public string? Log { get; set;}
        public DateTime DateEdited{ get;} = DateTime.Now;
        [JsonIgnore]
        public FinanceRecord? financeRecord{ get; set; }
    }
}