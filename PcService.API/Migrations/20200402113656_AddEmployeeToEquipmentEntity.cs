using Microsoft.EntityFrameworkCore.Migrations;

namespace PcService.API.Migrations
{
    public partial class AddEmployeeToEquipmentEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Equipments",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Equipments_EmployeeId",
                table: "Equipments",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipments_AspNetUsers_EmployeeId",
                table: "Equipments",
                column: "EmployeeId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipments_AspNetUsers_EmployeeId",
                table: "Equipments");

            migrationBuilder.DropIndex(
                name: "IX_Equipments_EmployeeId",
                table: "Equipments");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Equipments");
        }
    }
}
