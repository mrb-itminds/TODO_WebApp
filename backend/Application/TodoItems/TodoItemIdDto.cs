using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.TodoItems
{
  public class TodoItemIdDto : TodoItemDto, IAutoMap<TodoItem>
  {
    public int Id { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<TodoItem, TodoItemIdDto>()
        .IncludeBase<TodoItem, TodoItemDto>();
    }
  }
}
