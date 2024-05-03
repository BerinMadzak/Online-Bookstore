using API.Models.Order;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser<int>
    {
        public UserInfo UserInfo { get; set; }
    }
}