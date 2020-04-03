using Microsoft.EntityFrameworkCore.Migrations;

namespace PcService.API.Migrations
{
    public partial class AddCostsToElementsEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "PartsCost",
                table: "Elements",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "ServiceCost",
                table: "Elements",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PartsCost",
                table: "Elements");

            migrationBuilder.DropColumn(
                name: "ServiceCost",
                table: "Elements");
        }
    }
}
