using AutoMapper;
using Application.Common.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Application.ExampleEntities
{
  public class TodoItemDto : IAutoMap<TodoItem>
  {
    public string Name { get; set; }
    public TodoStates Type { get; set; }
    public int TodoListId { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<TodoItem, TodoItemDto>();
    }
  }
}
