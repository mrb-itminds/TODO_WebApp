using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ExampleChildren;
using Application.ExampleChildren.Commands.CreateExampleChild;
using Application.ExampleChildren.Commands.DeleteExampleChild;
using Application.ExampleEntities;
using Application.ExampleEntities.Queries.GetExampleChildren;
using Application.TodoItems;
using Application.TodoItems.Commands.CreateTodoItem;
using Application.TodoItems.Commands.DeleteTodoItem;
using Application.TodoItems.Commands.UpdateTodoItem;
using Application.TodoItems.Queries.GetTodoItems;
using Application.TodoLists;
using Application.TodoLists.Commands.CreateTodoList;
using Application.TodoLists.Queries.GetTodoLists;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class TodoListControllers : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateTodoListCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<List<TodoListIdDto>>> Get()
    {
      return await Mediator.Send(new GetTodoListsQuery());
    }
  }
}
