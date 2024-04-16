namespace API.RequestHelpers
{
    public class PaginationParameters
    {
        private const int MaxPageSize = 24;
        private int pageSize = 6;

        public int PageNumber { get; set; } = 1;
        public int PageSize
        {
            get => pageSize;
            set => pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
    }
}