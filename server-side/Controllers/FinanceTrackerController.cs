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
            var amount = float.Parse(financeRecord.Amount);
            var userId = int.Parse(financeRecord.UserId);
            var isProfit = bool.Parse(financeRecord.IsProfit);

            var record = new FinanceRecord
                {
                    UserId = userId,
                    Amount = amount,
                    Currency = financeRecord.Currency,
                    IsProfit = isProfit,
                    Category = category
                };

            if (category == null){

                var newCategory = new Category{
                    UserId = userId,
                    Name = financeRecord.Category,
                    HexColor = financeRecord.HexColor,
                };
                var response = await AddCategory(newCategory);
                if(response == null){
                    return BadRequest("Failed to add Category");
                }
            
                category = await _context.Categories.FirstOrDefaultAsync((c)=>c.Name == financeRecord.Category && c.HexColor == financeRecord.HexColor);

                if(category==null){
                    return BadRequest();
                }

                await _context.FinanceRecords.AddAsync(record);
                await _context.SaveChangesAsync();
                await AddDataLog(record,$"New category and record added {category.Name}");

                return Ok(record);
            }
            else{
                FinanceRecord? dbFinanceRecord = await _context.FinanceRecords.FirstOrDefaultAsync((f)=>f.CategoryId == category.Id && (f.IsProfit == isProfit) );

                if(dbFinanceRecord == null){

                    record.CategoryId = category.Id;

                    await _context.FinanceRecords.AddAsync(record);
                    await _context.SaveChangesAsync();
                    await AddDataLog(record,$"New record created {category.Name} ");

                    return Ok(record);
                }
                else{
                    dbFinanceRecord.Amount += amount;

                    await _context.SaveChangesAsync();
                    await AddDataLog(dbFinanceRecord,$"Added {amount} {dbFinanceRecord.Currency} to the {dbFinanceRecord.Category?.Name}");

                    return Ok(dbFinanceRecord);
                }

            }
        }

        [HttpGet("GetFinanceData/{Id:int}")]
        public async Task<ActionResult<FinanceTrackerData>> GetFinanceData(int Id)
        {

            var data = await _context.FinanceTrackerData
            .Include(f => f.FinanceRecords)
            .ThenInclude(f=>f.EditLogs)
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

        [HttpGet]
        public async Task<ActionResult> AddDataLog(FinanceRecord record,string log){
            var response = await _context.FinanceRecords.FirstOrDefaultAsync((f)=>f.CategoryId == record.CategoryId && f.IsProfit == record.IsProfit);

            if(response == null) return BadRequest();

            var editLog = new EditLog
        {
            Log = log,
            FinanceRecordId = response.Id,
        };
            await _context.EditLogs.AddAsync(editLog);
            await _context.SaveChangesAsync();
            return Ok();
        }
}}