namespace API.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public ShoppingCartDto ShoppingCart { get; set; }
    }
}