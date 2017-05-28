using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Moonshine.RestfulService.DA.Entities;
using Moonshine.RestfulService.DA.ApiContracts;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace Moonshine.RestfulService.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email
            };
            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                return StatusCode((int)HttpStatusCode.Conflict,
                    String.Join(Environment.NewLine, result.Errors.Select(x => x.Description)));
            }

            return Json(Ok());
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] PasswordRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var result = await _userManager.ChangePasswordAsync(user , request.OldPassword, request.Password);
            if (!result.Succeeded)
            {
                return StatusCode((int)HttpStatusCode.Conflict,
                    String.Join(Environment.NewLine, result.Errors.Select(x => x.Description)));
            }

            return Json(Ok());
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var result =
                    await _signInManager.PasswordSignInAsync(request.UserName, request.Password, true,
                        false);

                if (!result.Succeeded)
                {
                    return Json(new { errorMessage = "Invalid UserName or Password" });
                }
            }
            catch (Exception e)
            {
                return Json(new { errorMessage = e.Message });
            }
            return Json("success");
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync(); return Json(Ok());
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUserInfo()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var result = new UserInfoResponse
            {
                UserName = user.UserName,
                Email = user.Email
            };
            return Ok(result);
        }
    }
}