using Microsoft.EntityFrameworkCore.Migrations;

namespace PcService.API.Migrations
{
    public partial class AddStatusToEquipment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Equipments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Equipments");
        }
    }
}
