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
using server_side.Services;

namespace server_side.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly TokenService _tokenService;
        public AuthController(ApplicationDbContext context,TokenService tokenService){
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user){

Console.WriteLine("registering");
            if(await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Username or email already exists");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully");

        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] User user){
            Console.WriteLine("login");
            if(await _context.Users.AnyAsync(u => u.Email == user.Email && u.Password == user.Password)){
                return  Ok(_tokenService.GenerateJwtToken(user.Username));
            }
            return BadRequest("Error");
        }

    }
}