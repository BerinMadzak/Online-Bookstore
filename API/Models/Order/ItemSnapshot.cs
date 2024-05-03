using Microsoft.EntityFrameworkCore;

namespace API.Models.Order
{
    [Owned]
    public class ItemSnapshot
    {
        public int BookId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}