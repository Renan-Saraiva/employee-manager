using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Manager.Models
{
    public class Skill
    {
        public int SkillId { get; set; }
        [Required]
        public string Name { get; set; }
        public List<EmployeeSkill> EmployeeSkills { get; set; }
    }

}
