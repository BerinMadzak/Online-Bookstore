using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrderController : BaseController
    {
        private readonly StoreContext context;
        public OrderController(StoreContext context)
        {
            this.context = context;
        }

        //Endpoints
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await context.Orders.ToOrderDto().Where(x => x.CustomerId == User.Identity.Name).ToListAsync();
        }

        [HttpGet("{id}", Name="GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await context.Orders.ToOrderDto().Where(x => x.CustomerId == User.Identity.Name && x.Id == id)
            .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
            var cart = await context.ShoppingCarts.GetCartWithItems(User.Identity.Name).FirstOrDefaultAsync();

            if(cart == null) return BadRequest(new ProblemDetails {Title = "Could not find cart"});

            var items = new List<OrderItem>();
            foreach(var item in cart.Items)
            {
                var book = await context.Books.FindAsync(item.BookId);
                var itemSnapshot = new ItemSnapshot
                {
                    BookId = book.Id,
                    Name = book.Name,
                    PictureUrl = book.PictureUrl
                };
                var orderItem = new OrderItem
                {
                    ItemSnapshot = itemSnapshot,
                    Price = book.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
            }
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 5000 ? 0 : 500;

            var order = new Order
            {
                OrderItems = items,
                CustomerId = User.Identity.Name,
                CustomerInfo = orderDto.CustomerInfo,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee
            };

            context.Orders.Add(order);
            context.ShoppingCarts.Remove(cart);

            if(orderDto.SaveAddress)
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                user.UserInfo = new UserInfo
                {
                    FirstName = orderDto.CustomerInfo.FirstName,
                    LastName = orderDto.CustomerInfo.LastName,
                    Address1 = orderDto.CustomerInfo.Address1,
                    Address2 = orderDto.CustomerInfo.Address2,
                    City = orderDto.CustomerInfo.City,
                    State = orderDto.CustomerInfo.State,
                    Zip = orderDto.CustomerInfo.Zip,
                    Country = orderDto.CustomerInfo.Country
                };

                context.Update(user);
            }

            var result = await context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);

            return BadRequest("Problem creating order");
        }
    }
}