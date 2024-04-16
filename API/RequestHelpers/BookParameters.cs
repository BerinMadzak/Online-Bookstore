namespace API.RequestHelpers
{
    public class BookParameters : PaginationParameters
    {
        public string OrderBy { get; set; }
        public string Search { get; set; }
        public string Genres { get; set; }
        public string Author { get; set; }
    }
}