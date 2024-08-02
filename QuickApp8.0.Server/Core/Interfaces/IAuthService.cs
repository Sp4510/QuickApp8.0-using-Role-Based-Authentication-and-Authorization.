using QuickApp8._0.Server.Core.Dtos.Auth;
using QuickApp8._0.Server.Core.Dtos.Genral;
using System.Security.Claims;

namespace QuickApp8._0.Server.Core.Interfaces
{
    public interface IAuthService
    {
        Task<GenralServiceResponseDto> SeedRoleAsync();
        Task<GenralServiceResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<LoginServiceResponseDto?> LoginAsync(LoginDto loginDto);
        Task<GenralServiceResponseDto> UpdateRoleAsync(ClaimsPrincipal User, UpdateRoleDto updateRoleDto);
        Task<LoginServiceResponseDto?> MeAsync(MeDto meDto);
        Task<IEnumerable<UserInfoResult>> GetUsersListAsync();
        Task<UserInfoResult?> GetUserDetailsByUserNameAsync(string userName);
        Task<string> DeleteByIdAsync(string Id);
        Task<GenralServiceResponseDto> BlockByIdAsync(string Id);
    }
}
