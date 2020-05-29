using Microsoft.EntityFrameworkCore.Migrations;

namespace PcService.API.Migrations
{
    public partial class AddInvoiceIdToEquipmentsEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InvoiceId",
                table: "Equipments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Equipments");
        }
    }
}
