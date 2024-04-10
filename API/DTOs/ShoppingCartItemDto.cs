namespace API.DTOs
{
    public class ShoppingCartItemDto
    {
        public int BookId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public int YearOfRelease { get; set; }
        public int NumberOfPages { get; set; }
        public int Quantity { get; set; }
    }
}