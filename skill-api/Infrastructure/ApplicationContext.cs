using Manager.Models;
using Microsoft.EntityFrameworkCore;

namespace Manager.Infrastructure
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options): base(options)
        {

        }

        public DbSet<Skill> Skills { get; set; }
    }
}

