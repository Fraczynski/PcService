using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PcService.API.Data.Users;
using PcService.API.Dtos;
using PcService.API.Models;

namespace PcService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public UsersController(IUsersRepository repo, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{clientName}")]
        [Authorize(Policy = "RequireSalesmanRole")]
        public async Task<IActionResult> CheckUserExists(string clientName)
        {
            var user = await _userManager.FindByNameAsync(clientName);

            if (user == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user = await _userManager.FindByIdAsync(userId.ToString());

            var userToReturn = _mapper.Map<UserToEditDto>(user);

            if (userToReturn != null)
            {
                return Ok(userToReturn);
            }
            return NotFound();
        }

        [HttpPut("edit")]
        [Authorize]
        public async Task<IActionResult> EditProfile(UserToEditDto userToEditDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user = await _userManager.FindByIdAsync(userId.ToString());

            _mapper.Map(userToEditDto, user);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                if (userToEditDto.OldPassword != null && userToEditDto.OldPassword.Length > 0)
                {
                    if (userToEditDto.NewPassword != null && userToEditDto.NewPassword.Length > 0)
                    {
                        if (userToEditDto.NewPassword.Equals(userToEditDto.ConfirmPassword))
                        {
                            var passwordChangeResult = await _userManager.ChangePasswordAsync(user, userToEditDto.OldPassword, userToEditDto.NewPassword);

                            if (!passwordChangeResult.Succeeded)
                            {
                                return BadRequest(passwordChangeResult.Errors.First().Description);
                            }
                        }
                        else
                        {
                            return BadRequest("Confirmation password must match");
                        }
                    }
                    else
                    {
                        return BadRequest("New Password cannot be empty");
                    }
                }
                return NoContent();
            }
            return BadRequest("Fail");
        }
    }
}