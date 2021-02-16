using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class TodoItem : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public TodoStates Type { get; set; }
    public int TodoListId { get; set; }
    public virtual TodoList TodoList { get; set; }
  }
}
