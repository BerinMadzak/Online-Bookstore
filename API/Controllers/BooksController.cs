using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
        public async Task<ActionResult<List<Book>>> GetBooks([FromQuery] BookParameters bookParameters)
        {
            var query = context.Books
                .Sort(bookParameters.OrderBy)
                .Search(bookParameters.Search)
                .Filter(bookParameters.Genres, bookParameters.Author)
                .AsQueryable();

            var books = await PagedList<Book>.ToPagedList(query, bookParameters.PageNumber, bookParameters.PageSize);

            Response.AddPaginationHeader(books.MetaData);

            return books;
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