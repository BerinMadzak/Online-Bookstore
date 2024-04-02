using API.Entities;

namespace API.Data
{
    public static class DatabaseInitializer
    {
        public static void InitializeDatabase(StoreContext context)
        {
            if (context.Books.Any()) return;

            var books = new List<Book>
            {
                new Book
                {
                    Name = "Hamlet",
                    Description = BookDescriptionData.HamletDescription,
                    Price = 699,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780743477123.jpg?height=500&v=v2",
                    Author = "William Shakespeare",
                    Genre = "Tragedy",
                    YearOfRelease = 2003,
                    NumberOfPages = 432,
                },
                new Book
                {
                    Name = "To Kill a Mockingbird",
                    Description = BookDescriptionData.ToKillAMockingBirdDescription,
                    Price = 1699,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780060935467.jpg?height=500&v=v2",
                    Author = "Harper Lee",
                    Genre = "Southern Gothic",
                    YearOfRelease = 2005,
                    NumberOfPages = 336,
                },
                new Book
                {
                    Name = "Don Quixote",
                    Description = BookDescriptionData.DonQuixoteDescription,
                    Price = 2499,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780060934347.jpg?height=500&v=v2-70e46451e83cafa4ac83dff61e61921a",
                    Author = "Harper Lee",
                    Genre = "Southern Gothic",
                    YearOfRelease = 2005,
                    NumberOfPages = 992,
                },
                new Book
                {
                    Name = "Pride and Prejudice",
                    Description = BookDescriptionData.PrideAndPrejudiceDescription,
                    Price = 2500,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780141040349.jpg?height=500&v=v2",
                    Author = "Jane Austen",
                    Genre = "Romance",
                    YearOfRelease = 2009,
                    NumberOfPages = 480,
                },
                new Book
                {
                    Name = "Frankenstein",
                    Description = BookDescriptionData.FrankensteinDescription,
                    Price = 600,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780486282114.jpg?height=500&v=v2-b3aa87e78597820d6977a7fc41d2f9aa",
                    Author = "Mary Shelley",
                    Genre = "Gothic",
                    YearOfRelease = 1994,
                    NumberOfPages = 176,
                },
                new Book
                {
                    Name = "The Great Gatsby",
                    Description = BookDescriptionData.TheGreatGatsbyDescription,
                    Price = 1700,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780743273565.jpg?height=500&v=v2",
                    Author = "F. Scott Fitzgerald",
                    Genre = "Tragedy",
                    YearOfRelease = 2004,
                    NumberOfPages = 180,
                },
                new Book
                {
                    Name = "Romeo and Juliet",
                    Description = BookDescriptionData.RomeoAndJulietDescription,
                    Price = 699,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780743477116.jpg?height=500&v=v2",
                    Author = "William Shakespeare",
                    Genre = "Tragedy",
                    YearOfRelease = 2004,
                    NumberOfPages = 336,
                },
                new Book
                {
                    Name = "Othello",
                    Description = BookDescriptionData.OthelloDescription,
                    Price = 699,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780743477550.jpg?height=500&v=v2",
                    Author = "William Shakespeare",
                    Genre = "Tragedy",
                    YearOfRelease = 2004,
                    NumberOfPages = 368,

                },
                new Book
                {
                    Name = "Crime and Punishment",
                    Description = BookDescriptionData.CrimeAndPunishmentDescription,
                    Price = 1800,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9780679734505.jpg?height=500&v=v2",
                    Author = "Fyodor Dostoyevsky",
                    Genre = "Psychological",
                    YearOfRelease = 1993,
                    NumberOfPages = 624,
                },
                new Book
                {
                    Name = "Alice in Wonderland",
                    Description = BookDescriptionData.AliceInWonderlandDescription,
                    Price = 1599,
                    PictureUrl = "https://images-us.bookshop.org/ingram/9781840227802.jpg?height=500&v=v2",
                    Author = "Lewis Carroll",
                    Genre = "Fantasy",
                    YearOfRelease = 2018,
                    NumberOfPages = 160,
                },
            };

            context.Books.AddRange(books);
            context.SaveChanges();
        }
    }
}