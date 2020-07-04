using Manager.Models;
using Manager.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;
        public EmployeesController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> Get([FromQuery(Name = "byAge")]int? age, [FromQuery(Name = "byGender")] Gender? gender, [FromQuery(Name = "byName")] string name)
        {
            try
            {
                if (age.HasValue)
                    return await _repository.GetByAge(age.Value);

                if (gender.HasValue)
                    return await _repository.GetByGender(gender.Value);

                if (!string.IsNullOrWhiteSpace(name))
                    return await _repository.GetByName(name);

                return await _repository.GetAllAsync();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // GET employee/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                if (id > 0)
                {
                    var employee = await _repository.GetAsync(id);
                    if (employee == null)
                    {
                        return NotFound();
                    }

                    return Ok(employee);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // POST employee
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee employee)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    employee.EmployeeId = 0;
                    await _repository.AddAsync(employee);                    
                    return Ok(employee);
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // PUT employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Employee employee)
        {
            try
            {
                if (id <= 0)
                    return BadRequest();

                if (ModelState.IsValid)
                {

                    if (!await _repository.ExistAsync(id))
                        return NotFound();

                    employee.EmployeeId = id;
                    await _repository.UpdateAsync(employee);

                    return Ok(employee);
                }

                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        // DELETE employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (id > 0)
                {
                    var result = await _repository.DeleteAsync(id);
                    if (result == 0)
                    {
                        return NotFound();
                    }

                    return Ok();
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
