using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_side.Context;
using server_side.Models;
using server_side.Models.DTO;

namespace server_side.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FinanceTrackerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public FinanceTrackerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("AddFinanceRecord")]
        public async Task<ActionResult<FinanceRecord>>AddFinanceRecord([FromBody] FinanceRecordDTO financeRecord){
            var category = await _context.Categories.FirstOrDefaultAsync((c)=>c.Name == financeRecord.Category && c.HexColor == financeRecord.HexColor);

            if (category == null){
                var newCategory = new Category{
                    UserId = int.Parse(financeRecord.UserId),
                    Name = financeRecord.Category,
                    HexColor = financeRecord.HexColor,
                };
                var response = await AddCategory(newCategory);
                category = await _context.Categories.FirstOrDefaultAsync((c)=>c.Name == financeRecord.Category && c.HexColor == financeRecord.HexColor);
                }

            if (category == null)  // Double-check if the category is still null after attempting to create it
            {
                return BadRequest("Category could not be found or created.");
            }

            var record = new FinanceRecord
            {
                UserId = int.Parse(financeRecord.UserId),
                Amount = float.Parse(financeRecord.Amount),
                Currency = financeRecord.Currency,
                IsProfit = bool.Parse(financeRecord.IsProfit),
                CategoryId = category.Id,
                Category = category
            };

            await _context.FinanceRecords.AddAsync(record);
            await _context.SaveChangesAsync();

            return Ok(record);
        }

        [HttpGet("GetFinanceData/{Id:int}")]
        public async Task<ActionResult<FinanceTrackerData>> GetFinanceData(int Id)
        {

            var data = await _context.FinanceTrackerData
            .Include(f => f.FinanceRecords)
            .Where(d => d.UserId == Id)
            .FirstOrDefaultAsync();

            if (data == null) return NotFound();
            return data;
        }

        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory([FromBody] Category category){
            var userExists = await _context.Users.AnyAsync(u => u.Id == category.UserId);
            if (!userExists)
            {
                return BadRequest("User does not exist.");
            }

            var data = await _context.Categories
            .FirstOrDefaultAsync(c => c.Name == category.Name && category.UserId == c.UserId && c.HexColor == category.HexColor);

            if(data != null) return BadRequest("The same category already exists");
            
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return Ok("Category created successfully");
        }

        [HttpGet("GetCategories/{userId:int}")]
        public async Task<ActionResult<List<Category>>> GetCategories(int userId){
            var data = await _context.Categories
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return Ok(data);
        }

        [HttpDelete("DeleteCategories/{categoryId:int}")]
        public async Task<ActionResult> DeleteCategory(int categoryId){
            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null)return NotFound();

            _context.Categories.Remove(category);

            await _context.SaveChangesAsync();

            return NoContent();
        }
}}