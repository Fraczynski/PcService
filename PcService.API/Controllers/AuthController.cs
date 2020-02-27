using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PcService.API.Data;
using PcService.API.Dtos;
using PcService.API.Models;

namespace PcService.API.Controllers
{
     [Route("api/[controller]")]
     [ApiController]
     [AllowAnonymous]
     public class AuthController : ControllerBase
     {
          private readonly IConfiguration _config;
          private readonly SignInManager<User> _signInManager;
          private readonly UserManager<User> _userManager;
          public AuthController(IConfiguration config,
          UserManager<User> userManager, SignInManager<User> signInManager)
          {
               _userManager = userManager;
               _signInManager = signInManager;
               _config = config;
          }

          [HttpPost("register")]
          public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
          {
               var userToCreate = new User
               {
                    UserName = userForRegisterDto.UserName,
               };

               var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

               if (result.Succeeded)
               {
                    return StatusCode(201);
               }
               return BadRequest(result.Errors);

          }

          [HttpPost("login")]
          public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
          {
               var user = await _userManager.FindByNameAsync(userForLoginDto.Username);

               var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);

               if (result.Succeeded)
               {
                    return Ok(new
                    {
                         token = GenerateJwtTokenAsync(user)
                    });
               }

               return Unauthorized();
          }

          private async Task<string> GenerateJwtTokenAsync(User user)
          {
               var claims = new List<Claim>
               {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
               };

               var roles = await _userManager.GetRolesAsync(user);

               foreach (var role in roles)
               {
                    claims.Add(new Claim(ClaimTypes.Role, role));
               }

               var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

               var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

               var tokenDescriptor = new SecurityTokenDescriptor
               {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = creds
               };

               var tokenHandler = new JwtSecurityTokenHandler();

               var token = tokenHandler.CreateToken(tokenDescriptor);

               return tokenHandler.WriteToken(token);
          }
     }
}