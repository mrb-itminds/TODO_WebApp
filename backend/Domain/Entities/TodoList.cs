using System.Collections.Generic;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class TodoList : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int UserId { get; set; }
    public virtual User User { get; set; }
    public virtual ICollection<TodoItem> TodoItems { get; set; }
     
  }
}
