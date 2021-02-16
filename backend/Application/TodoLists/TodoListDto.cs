using Application.Common.Mappings;
using AutoMapper;

namespace Application.TodoLists
{
  public class TodoListDto : IAutoMap<Domain.Entities.TodoList>
  {
    public string Name { get; set; }
    public int UserId { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<Domain.Entities.TodoList, TodoListDto>();
    }
  }
}
