using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server_side.Migrations
{
    /// <inheritdoc />
    public partial class EditLognameFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EditLog_FinanceRecords_FinanceRecordId",
                table: "EditLog");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EditLog",
                table: "EditLog");

            migrationBuilder.RenameTable(
                name: "EditLog",
                newName: "EditLogs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EditLogs",
                table: "EditLogs",
                column: "FinanceRecordId");

            migrationBuilder.AddForeignKey(
                name: "FK_EditLogs_FinanceRecords_FinanceRecordId",
                table: "EditLogs",
                column: "FinanceRecordId",
                principalTable: "FinanceRecords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EditLogs_FinanceRecords_FinanceRecordId",
                table: "EditLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EditLogs",
                table: "EditLogs");

            migrationBuilder.RenameTable(
                name: "EditLogs",
                newName: "EditLog");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EditLog",
                table: "EditLog",
                column: "FinanceRecordId");

            migrationBuilder.AddForeignKey(
                name: "FK_EditLog_FinanceRecords_FinanceRecordId",
                table: "EditLog",
                column: "FinanceRecordId",
                principalTable: "FinanceRecords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
