using Manager.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Manager.Repositories
{
    public interface ISkillRepository
    {
        public Task<List<Skill>> GetAllAsync();
    }
}
