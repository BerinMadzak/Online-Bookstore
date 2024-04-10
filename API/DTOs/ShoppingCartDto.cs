namespace API.DTOs
{
    public class ShoppingCartDto
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public List<ShoppingCartItemDto> Items { get; set; }
    }
}