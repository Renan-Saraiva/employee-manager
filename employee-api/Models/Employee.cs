using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Manager.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime BornOn { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public Gender Gender { get; set; }
        [JsonPropertyName("skills")]
        public List<EmployeeSkill> EmployeeSkills { get; set; }
        [NotMapped]
        public int Age { 
            get 
            {
                var age = DateTime.Today.Year - this.BornOn.Year;
                if (this.BornOn.Date > DateTime.Today.AddYears(-age)) 
                    age--;

                return age;
            }
        }
    }

    public class Skill
    {
        public int SkillId { get; set; }
        [Required]
        public string Name { get; set; }
        public List<EmployeeSkill> EmployeeSkills { get; set; }
    }

    public enum Gender
    {
        Female = 1,
        Male = 2
    }

    public class EmployeeSkill
    {
        [JsonIgnore]
        public int EmployeeId { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }        
        public int SkillId { get; set; }
        [JsonIgnore]
        public Skill Skill { get; set; }
    }
}
