using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly FinanceTrackerDataContext _context;
        public FinanceTrackerController(FinanceTrackerDataContext context)
        {
            _context = context;
        }


    [HttpGet("home")]
    public string Home()
    {
        return "hi";
    }


    [HttpGet("GetFinanceData/{Id:int}")]
    public async Task<ActionResult<FinanceTrackerData>> GetFinanceData(int Id)
    {
        var data = await _context.FinanceTrackerData.Include(f => f.FinanceData)
        .ThenInclude(financeData => financeData.Color)
        .Where(d => d.UserId == Id).FirstOrDefaultAsync();

        if (data == null) return NotFound();
        return data;
    }
    }
}