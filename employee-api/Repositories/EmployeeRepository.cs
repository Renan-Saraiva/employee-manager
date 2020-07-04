using Manager.Infrastructure;
using Manager.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Manager.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationContext _context;
        public EmployeeRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<int> AddAsync(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee.EmployeeId;
        }

        public async Task<int> DeleteAsync(int id)
        {
            int result = 0;

            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId.Equals(id));

            if (employee != null)
            {
                _context.Employees.Remove(employee);
                result = await _context.SaveChangesAsync();
            }

            return result;
        }

        public async Task<Employee> GetAsync(int id)
        {
            return await _context.Employees.Include(e => e.EmployeeSkills).FirstOrDefaultAsync(e => e.EmployeeId.Equals(id));
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.Include(e => e.EmployeeSkills).ToListAsync();
        }

        public async Task UpdateAsync(Employee employee)
        {
            await ClearSkills(employee.EmployeeId);

            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        private async Task ClearSkills(int employeeId)
        {
            var employeeIn = await GetAsync(employeeId);
            if (employeeIn.EmployeeSkills.Any())
            {
                employeeIn.EmployeeSkills.Clear();
                await _context.SaveChangesAsync();
            }
            _context.Entry(employeeIn).State = EntityState.Detached;
        }

        public async Task<bool> ExistAsync(int id)
        {
            return await _context.Employees.AnyAsync(e => e.EmployeeId.Equals(id));
        }

        public async Task<List<Employee>> GetByAge(int age)
        {
            DateTime today = DateTime.Today;
            DateTime min = today.AddYears(-(age + 1));
            DateTime max = today.AddYears(-age);

            return await _context.Employees.Include(e => e.EmployeeSkills).Where(e => e.BornOn > min && e.BornOn <= max).ToListAsync();
        }

        public async Task<List<Employee>> GetByGender(Gender gender)
        {
            return await _context.Employees.Include(e => e.EmployeeSkills).Where(e => e.Gender == gender).ToListAsync();
        }
    }  
}