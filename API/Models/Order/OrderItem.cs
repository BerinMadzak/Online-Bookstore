namespace API.Models.Order
{
    public class OrderItem
    {
        public int Id { get; set; }
        public ItemSnapshot ItemSnapshot { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}