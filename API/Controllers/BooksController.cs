using API.Data;
using API.Entities;
using API.Extensions;
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
        public async Task<ActionResult<List<Book>>> GetBooks(string orderBy, string search)
        {
            var query = context.Books
                .Sort(orderBy)
                .Search(search)
                .AsQueryable();

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await context.Books.FindAsync(id);

            if (book == null) return NotFound();

            return book;
        }
    }
}