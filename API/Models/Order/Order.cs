using System.ComponentModel.DataAnnotations;

namespace API.Models.Order
{
    public enum OrderStatus {Pending, PaymentReceived, PaymentFailed}
    public class Order
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        [Required]
        public CustomerInfo CustomerInfo { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStatus OrderStatus { get; set; }
    }
}