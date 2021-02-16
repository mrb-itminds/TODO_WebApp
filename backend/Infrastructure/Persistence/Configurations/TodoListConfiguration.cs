using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class TodoListConfiguration : IEntityTypeConfiguration<TodoList>
  {
    public void Configure(EntityTypeBuilder<TodoList> builder)
    {
      builder.Property(e => e.Name)
        .HasMaxLength(200)
        .IsRequired();

      builder.HasMany<TodoItem>(e => e.TodoItems)
        .WithOne(e => e.TodoList)
        .IsRequired(true);
    }
  }
}
