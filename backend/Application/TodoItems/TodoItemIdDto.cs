using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Mappings;
using Application.ExampleChildren;
using AutoMapper;
using Domain.Entities;

namespace Application.ExampleEntities
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
