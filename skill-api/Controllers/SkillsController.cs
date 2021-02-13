using System.Collections.Generic;
using System.Threading.Tasks;
using Manager.Models;
using Manager.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly ISkillRepository _repository;

        public SkillsController(ISkillRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<Skills>
        [HttpGet]
        public async Task<ActionResult<List<Skill>>> Get()
        {
            return await _repository.GetAllAsync();
        }
    }
}
