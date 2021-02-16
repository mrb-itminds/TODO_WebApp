using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.TodoLists
{
  public class TodoListDto : IAutoMap<TodoList>
  {
    public string Name { get; set; }
    public int UserId { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<TodoList, TodoListDto>();
    }
  }
}
