namespace QuickApp8._0.Server.Core.Dtos.Log1
{
    public class GetLogDto
    {
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? UserName { get; set; }
        public string Description { get; set; }
    }
}
