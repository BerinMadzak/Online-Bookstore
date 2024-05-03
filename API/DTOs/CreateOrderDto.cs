using API.Models.Order;

namespace API.DTOs
{
    public class CreateOrderDto
    {
        public bool SaveAddress { get; set; }
        public CustomerInfo CustomerInfo { get; set; }
    }
}