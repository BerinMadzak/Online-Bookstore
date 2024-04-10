using API.DTOs;
using API.Models;

namespace API.Extensions
{
    public static class ShoppingCartExtensions
    {
        public static ShoppingCartDto ToShoppingCartDto(this ShoppingCart cart)
        {
            return new ShoppingCartDto
            {
                Id = cart.Id,
                CustomerId = cart.CustomerId,
                Items = cart.Items.Select(item => new ShoppingCartItemDto
                {
                    BookId = item.BookId,
                    Name = item.Book.Name,
                    Description = item.Book.Description,
                    Price = item.Book.Price,
                    PictureUrl = item.Book.PictureUrl,
                    Author = item.Book.Author,
                    Genre = item.Book.Genre,
                    YearOfRelease = item.Book.YearOfRelease,
                    NumberOfPages = item.Book.NumberOfPages,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}