using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Manager.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    SkillId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.SkillId);
                });

            migrationBuilder.InsertData(table: "Skills", columns: new[] { "Name" }, values: new object[] { "C#" });
            migrationBuilder.InsertData(table: "Skills", columns: new[] { "Name" }, values: new object[] { "Java" });
            migrationBuilder.InsertData(table: "Skills", columns: new[] { "Name" }, values: new object[] { "Angular" });
            migrationBuilder.InsertData(table: "Skills", columns: new[] { "Name" }, values: new object[] { "SQL" });
            migrationBuilder.InsertData(table: "Skills", columns: new[] { "Name" }, values: new object[] { "ASP" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Skills");
        }
    }
}
