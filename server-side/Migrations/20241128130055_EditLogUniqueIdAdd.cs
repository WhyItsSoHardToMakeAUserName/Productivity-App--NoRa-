using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server_side.Migrations
{
    /// <inheritdoc />
    public partial class EditLogUniqueIdAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EditLogs",
                table: "EditLogs");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "EditLogs",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_EditLogs",
                table: "EditLogs",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_EditLogs_FinanceRecordId",
                table: "EditLogs",
                column: "FinanceRecordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EditLogs",
                table: "EditLogs");

            migrationBuilder.DropIndex(
                name: "IX_EditLogs_FinanceRecordId",
                table: "EditLogs");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "EditLogs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EditLogs",
                table: "EditLogs",
                column: "FinanceRecordId");
        }
    }
}
