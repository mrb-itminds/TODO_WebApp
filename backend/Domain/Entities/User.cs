using System.Collections.Generic;

namespace Domain.Entities
{
  public class User
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public virtual ICollection<TodoItem> TodoItems { get; set; }
  }
}
