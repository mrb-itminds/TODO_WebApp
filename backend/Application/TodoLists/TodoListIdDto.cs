using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.TodoLists
{
  public class TodoListIdDto : TodoListDto, IAutoMap<TodoList>
  {
    public int Id { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<TodoList, TodoListIdDto>().IncludeBase<TodoList, TodoListDto>();
    }
  }
}
