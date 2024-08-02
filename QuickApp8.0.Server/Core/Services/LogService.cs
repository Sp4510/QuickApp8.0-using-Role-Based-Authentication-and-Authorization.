using Microsoft.EntityFrameworkCore;
using QuickApp8._0.Server.Core.DbContext;
using QuickApp8._0.Server.Core.Dtos.Log1;
using QuickApp8._0.Server.Core.Entities;
using QuickApp8._0.Server.Core.Interfaces;
using System.Security.Claims;

namespace QuickApp8._0.Server.Core.Services
{
    public class LogService : ILogService
    {
        private readonly ApplicationDbContext _context;

        public LogService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SaveNewLog(string UserName, string Description)
        {
            var newLog = new Log()
            {
                UserName = UserName,
                Description = Description
            };
            await _context.logs.AddAsync(newLog);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<GetLogDto>> GetLogsAsync()
        {
            var logs = await _context.logs.Select(x => new GetLogDto 
            {  UserName = x.UserName, 
               Description = x.Description,
               CreatedAt = x.CreatedAt 
            })
                .OrderByDescending(x => x.CreatedAt).ToListAsync();
            return logs;
        }

        public async Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal User)
        {
            var logs = await _context.logs.Where(x => x.UserName == User.Identity.Name).Select(x => new GetLogDto
            {
                UserName = x.UserName,
                Description = x.Description,
                CreatedAt = x.CreatedAt
            })
                .OrderByDescending(x => x.CreatedAt).ToListAsync();
            return logs;
        }
    }
}
