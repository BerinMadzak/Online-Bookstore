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
    }
}