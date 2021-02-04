using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Infrastructure.Persistence.Migrations
{
  public partial class Example : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "ExampleChildLists",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_ExampleChildLists", x => x.Id);
          });

      migrationBuilder.CreateTable(
          name: "ExampleChildren",
          columns: table => new
          {
            Id = table.Column<int>(type: "int", nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
            ExampleEnum = table.Column<int>(type: "int", nullable: false),
            ExampleChildListId = table.Column<int>(type: "int", nullable: true),
            CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
            Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
            LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
            LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_ExampleChildren", x => x.Id);
            table.ForeignKey(
                      name: "FK_ExampleChildren_ExampleChildLists_ExampleChildListId",
                      column: x => x.ExampleChildListId,
                      principalTable: "ExampleChildLists",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
          });

      migrationBuilder.CreateIndex(
          name: "IX_ExampleChildren_ExampleChildListId",
          table: "ExampleChildren",
          column: "ExampleChildListId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "ExampleChildren");

      migrationBuilder.DropTable(
          name: "ExampleChildLists");
    }
  }
}
