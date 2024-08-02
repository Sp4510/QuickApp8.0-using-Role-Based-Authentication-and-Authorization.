

namespace QuickApp8._0.Server.Core.Dtos.Auth
{ 
    public class LoginServiceResponseDto
    {
        public string NewToken { get; set; }

        // this will be return to frontend
        public UserInfoResult UserInfo { get; set; }
    }
}
