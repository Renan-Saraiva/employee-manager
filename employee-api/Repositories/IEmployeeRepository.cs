using Manager.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Manager.Repositories
{
    public interface IEmployeeRepository
    {
        public Task<List<Employee>> GetAllAsync();
        public Task<Employee> GetAsync(int id);
        public Task<int> AddAsync(Employee employee);
        public Task<int> DeleteAsync(int id);
        public Task UpdateAsync(Employee employee);
        public Task<bool> ExistAsync(int id);
        public Task<List<Employee>> GetByAge(int age);
        public Task<List<Employee>> GetByGender(Gender gender);
    }
}