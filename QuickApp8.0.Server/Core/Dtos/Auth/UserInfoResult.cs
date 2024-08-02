namespace QuickApp8._0.Server.Core.Dtos.Auth
{
    public class UserInfoResult
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public bool IsBlocked { get; set; }
    }
}
