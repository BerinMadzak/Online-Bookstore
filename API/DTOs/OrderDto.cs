using API.Models.Order;

namespace API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public CustomerInfo CustomerInfo { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public string OrderStatus { get; set; }
        public long Total { get; set; }
    }
}