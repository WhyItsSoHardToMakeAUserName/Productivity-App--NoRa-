using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server_side.Migrations
{
    /// <inheritdoc />
    public partial class FinanceRecordIdAsPrimaryKeyOfEditLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EditLog",
                table: "EditLog");

            migrationBuilder.DropIndex(
                name: "IX_EditLog_FinanceRecordId",
                table: "EditLog");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "EditLog");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EditLog",
                table: "EditLog",
                column: "FinanceRecordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EditLog",
                table: "EditLog");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "EditLog",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_EditLog",
                table: "EditLog",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_EditLog_FinanceRecordId",
                table: "EditLog",
                column: "FinanceRecordId");
        }
    }
}
