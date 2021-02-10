using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ExampleChildren;
using Application.ExampleChildren.Commands.CreateExampleChild;
using Application.ExampleChildren.Commands.DeleteExampleChild;
using Application.ExampleEntities;
using Application.ExampleEntities.Queries.GetExampleChildren;
using Application.TodoItems.Commands.CreateTodoItem;
using Application.TodoItems.Commands.DeleteTodoItem;
using Application.TodoItems.Commands.Queries.GetTodoItems;
using Application.TodoItems.Commands.UpdateTodoItem;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class TodoItemController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateTodoItemCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update([FromRoute] int id, UpdateTodoItemCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
      await Mediator.Send(new DeleteTodoItemCommand()
      {
        Id = id
      });
      return NoContent();
    }
    [HttpGet]
    public async Task<ActionResult<List<TodoItemIdDto>>> Get()
    {
      return await Mediator.Send(new GetTodoItemsQuery());
    }

  }
}
