using API.Entities;

namespace API.Extensions
{
    public static class BookExtensions
    {
        public static IQueryable<Book> Sort(this IQueryable<Book> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Book> Search(this IQueryable<Book> query, string search)
        {
            if (string.IsNullOrEmpty(search)) return query;

            var term = search.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(term));
        }

        public static IQueryable<Book> Filter(this IQueryable<Book> query, string genres, string author)
        {
            var genreList = new List<string>();

            if (!string.IsNullOrEmpty(genres)) genreList.AddRange(genres.ToLower().Split(',').ToList());

            query = query.Where(p => genreList.Count == 0 || genreList.Contains(p.Genre.ToLower()));

            if (!string.IsNullOrEmpty(author)) query = query.Where(p => p.Author.ToLower() == author.ToLower());

            return query;
        }
    }
}