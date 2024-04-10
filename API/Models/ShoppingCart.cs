using API.Entities;

namespace API.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public List<ShoppingCartItem> Items { get; set; } = [];

        public void AddItem(Book book, int quantity)
        {
            if (Items.All(x => x.BookId != book.Id))
            {
                Items.Add(new ShoppingCartItem { Book = book, Quantity = quantity });
            }

            var item = Items.FirstOrDefault(x => x.BookId == book.Id);
            if (item != null) item.Quantity += quantity;
        }

        public void RemoveItem(int bookId, int quantity)
        {
            var item = Items.FirstOrDefault(x => x.BookId == bookId);
            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}