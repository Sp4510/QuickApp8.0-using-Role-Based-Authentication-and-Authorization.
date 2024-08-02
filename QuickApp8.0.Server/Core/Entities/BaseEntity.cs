namespace QuickApp8._0.Server.Core.Entities
{
    public class BaseEntity
    {
        public int Id { get; set;}
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool isActive { get; set; } = true;
        public bool isDeleted { get; set; } = false;
    }
}
