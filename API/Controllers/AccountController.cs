using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly UserManager<User> userManager;
        private readonly TokenService tokenService;
        private readonly StoreContext context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.context = context;
        }

        //Endpoints

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await userManager.CheckPasswordAsync(user, loginDto.Password)) return Unauthorized();

            var userCart = await RetrieveShoppingCart(loginDto.Username);
            var anonCart = await RetrieveShoppingCart(Request.Cookies["customerId"]);

            if (anonCart != null)
            {
                if (userCart != null) context.ShoppingCarts.Remove(userCart);
                anonCart.CustomerId = user.UserName;
                Response.Cookies.Delete("customerId");
                await context.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user),
                ShoppingCart = anonCart != null ? anonCart.ToShoppingCartDto() : userCart?.ToShoppingCartDto()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };
            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var shoppingCart = await RetrieveShoppingCart(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user),
                ShoppingCart = shoppingCart?.ToShoppingCartDto()
            };
        }

        //Helper methods
        private async Task<ShoppingCart> RetrieveShoppingCart(string customerId)
        {
            if (string.IsNullOrEmpty(customerId))
            {
                Response.Cookies.Delete("customerId");
                return null;
            }

            return await context.ShoppingCarts
                .Include(i => i.Items)
                .ThenInclude(p => p.Book)
                .FirstOrDefaultAsync(x => x.CustomerId == customerId);
        }
    }
}