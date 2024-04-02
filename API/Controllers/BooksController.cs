using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BooksController : BaseController
    {
        private readonly StoreContext context;
        public BooksController(StoreContext context)
        {
            this.context = context;
        }

        //Endpoints
        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            return await context.Books.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            return await context.Books.FindAsync(id);
        }
    }
}