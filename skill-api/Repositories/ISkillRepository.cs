using System.Collections.Generic;
using System.Threading.Tasks;
using Manager.Models;

namespace Manager.Repositories
{
    public interface ISkillRepository
    {
        public Task<List<Skill>> GetAllAsync();
    }
}
