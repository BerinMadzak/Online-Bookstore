using API.DTOs;
using API.Models.Order;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ToOrderDto(this IQueryable<Order> query)
	{
		return query
			.Select(order => new OrderDto{
				Id = order.Id,
				CustomerId = order.CustomerId,
				OrderDate = order.OrderDate,
				CustomerInfo = order.CustomerInfo,
				DeliveryFee = order.DeliveryFee,
				Subtotal = order.Subtotal,
				OrderStatus = order.OrderStatus.ToString(),
				Total = order.Subtotal + order.DeliveryFee,
				OrderItems = order.OrderItems.Select(item => new OrderItemDto{
					BookId = item.ItemSnapshot.BookId,
					Name = item.ItemSnapshot.Name,
					PictureUrl = item.ItemSnapshot.PictureUrl,
					Price = item.Price,
					Quantity = item.Quantity
				}).ToList()
			}).AsNoTracking(); 
	}
    }
}