using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class TodoItem : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public TodoStates Type { get; set; }
    public int UserId { get; set; }

    public virtual User User { get; set; }
  }
}
