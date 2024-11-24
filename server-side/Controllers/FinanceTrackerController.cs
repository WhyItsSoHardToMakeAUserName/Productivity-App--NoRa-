using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using server_side.Context;
using server_side.Models;

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
        public async Task<ActionResult>AddFinanceRecord([FromBody] FinanceRecord financeRecord){

            var userExists = await _context.Users.AnyAsync(u => u.Id == financeRecord.UserId);

            await _context.FinanceRecords.AddAsync(financeRecord);
            await _context.SaveChangesAsync();

            return Ok();
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
            .FirstOrDefaultAsync(c => c.Name == category.Name && category.UserId == c.UserId);

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