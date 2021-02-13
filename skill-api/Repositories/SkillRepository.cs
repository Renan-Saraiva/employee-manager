using Manager.Infrastructure;
using Manager.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Manager.Repositories
{
    public class SkillRepository : ISkillRepository
    {
        private readonly ApplicationContext _context;
        public SkillRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<Skill>> GetAllAsync()
        {
            return await _context.Skills.ToListAsync();
        }
    }
}
