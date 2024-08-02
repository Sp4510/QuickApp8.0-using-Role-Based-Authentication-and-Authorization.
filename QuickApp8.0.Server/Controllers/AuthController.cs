using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickApp8._0.Server.Core.Constants;
using QuickApp8._0.Server.Core.Dtos.Auth;
using QuickApp8._0.Server.Core.Interfaces;

namespace QuickApp8._0.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // Route -> Seed Roles to DB
        [HttpPost]
        [Route("Seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            var seedResult = await _authService.SeedRoleAsync();
            return StatusCode(seedResult.StatusCode, seedResult.Message);
        }

        // Route -> Register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var registerResult = await _authService.RegisterAsync(registerDto);
            return StatusCode(registerResult.StatusCode, registerResult.Message);
        }

        // Route -> Login
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<LoginServiceResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var loginResult = await _authService.LoginAsync(loginDto);
            if (loginResult == null)
            {
                return BadRequest();
            }
            return Ok(loginResult);
        }

        // Route -> Update User Role
        // An Owner can change everything
        // An Admin can change just User to Manager or reverse
        // Manager and User Roles don't have access to this Route
        [HttpPost]
        [Route("update-role")]
        [Authorize(Roles = StaticUserRoles.OwnerAdmin)]
        public async Task<IActionResult> UpdateRol([FromBody] UpdateRoleDto updateRoleDto)
        {
            var updateRoleResult = await _authService.UpdateRoleAsync(User, updateRoleDto);

            if (updateRoleResult.IsSucceed)
            {
                return Ok(updateRoleResult.Message);
            }
            else
            {
                return StatusCode(updateRoleResult.StatusCode, updateRoleResult.Message);
            }
        }

        // Route -> getting user data from to JWT
        [HttpPost]
        [Route("me")]
        public async Task<ActionResult<LoginServiceResponseDto>> Me([FromBody] MeDto token)
        {
            try
            {
                var me = await _authService.MeAsync(token);
                if (me is not null)
                {
                    return Ok(me);
                }
                else
                {
                    return Unauthorized("Invalid Token");
                }
            }
            catch (Exception) {
                return Unauthorized("Invalid Token");
            }
        }

        // Route -> List of all users with details
        [HttpGet]
        [Route("users")]
        public async Task<ActionResult<IEnumerable<UserInfoResult>>> GetUsersList()
        {
            var usersList = await _authService.GetUsersListAsync();
            return Ok(usersList);
        }

        // Route -> Get a User by UserName
        [HttpGet]
        [Route("users/{userName}")]
        public async Task<ActionResult<UserInfoResult>> GetUserDetailsByUserName([FromRoute] string userName)
        {
            var user = await _authService.GetUserDetailsByUserNameAsync(userName);
            if (user is not null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound("UserName not found");
            }
        }

        // Route -> Delete the User
        [HttpDelete]
        [Route("users/{Id}")]
        [Authorize(Roles = StaticUserRoles.OwnerAdmin)]
       
        public async Task<string> DeleteUser(string Id)
        {
            var user = await _authService.DeleteByIdAsync(Id);
            return user;
        }

        // Route -> Block the user
        [HttpPost]
        [Route("blocked/{Id}")]
        public async Task<IActionResult> BlockUser(string Id)
        {
            var user = await _authService.BlockByIdAsync(Id);
            return StatusCode(user.StatusCode, user.Message);
        }
    }
}
