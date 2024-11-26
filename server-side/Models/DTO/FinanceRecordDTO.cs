namespace server_side.Models.DTO
{
    public class FinanceRecordDTO
    {
        public required string UserId { get; set; }
        public required string Amount { get; set; }
        public required string Currency { get; set; }
        public required string IsProfit { get; set; }
        public required string HexColor { get; set; }
        public required string Category { get; set; }
    }
}