using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ExampleChildren;
using Application.ExampleChildren.Commands.CreateExampleChild;
using Application.ExampleChildren.Commands.DeleteExampleChild;
using Application.ExampleChildren.Commands.UpdateExampleChild;
using Application.ExampleChildren.Queries.GetExampleChildren;
using Application.TodoItems.Commands.CreateTodoItem;
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
    

  }
}
