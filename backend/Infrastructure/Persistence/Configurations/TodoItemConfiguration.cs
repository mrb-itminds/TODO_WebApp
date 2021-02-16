using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Users;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
  {
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
      builder.Property(e => e.Name)
        .HasMaxLength(200)
        .IsRequired();

      builder.HasOne<TodoList>(e => e.TodoList)
        .WithMany(e => e.TodoItems)
        .IsRequired(true);
    }
  }
}