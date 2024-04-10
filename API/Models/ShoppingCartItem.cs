using API.Entities;

namespace API.Models
{
    public class ShoppingCartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int BookId { get; set; }
        public int ShoppingCartId { get; set; }

        //Navigation Properties
        public Book Book { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
    }
}