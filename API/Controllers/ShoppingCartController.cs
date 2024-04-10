using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ShoppingCartController : BaseController
    {
        private readonly StoreContext context;
        public ShoppingCartController(StoreContext context)
        {
            this.context = context;
        }

        //Endpoints
        [HttpGet(Name = "GetShoppingCart")]
        public async Task<ActionResult<ShoppingCartDto>> GetShoppingCart()
        {
            var cart = await RetrieveShoppingCart();

            if (cart == null) return NotFound();

            return Ok(cart.ToShoppingCartDto());
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingCartDto>> AddItemToCart(int bookId, int quantity)
        {
            var cart = await RetrieveShoppingCart();
            if (cart == null) cart = CreateShoppingCart();

            var book = await context.Books.FindAsync(bookId);
            if (book == null) return NotFound();

            cart.AddItem(book, quantity);

            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetShoppingCart", cart.ToShoppingCartDto());

            return BadRequest(new ProblemDetails { Title = "Problem adding to cart" });
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteItemFromCart(int bookId, int quantity)
        {
            var cart = await RetrieveShoppingCart();
            if (cart == null) return NotFound();

            cart.RemoveItem(bookId, quantity);

            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing from cart" });
        }

        //Helper Methods
        private async Task<ShoppingCart> RetrieveShoppingCart()
        {
            return await context.ShoppingCarts
                .Include(i => i.Items)
                .ThenInclude(p => p.Book)
                .FirstOrDefaultAsync(x => x.CustomerId == Request.Cookies["customerId"]);
        }

        private ShoppingCart CreateShoppingCart()
        {
            //Create cookie
            var customerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("customerId", customerId, cookieOptions);

            //Create cart
            var cart = new ShoppingCart { CustomerId = customerId };
            context.ShoppingCarts.Add(cart);

            return cart;
        }
    }
}