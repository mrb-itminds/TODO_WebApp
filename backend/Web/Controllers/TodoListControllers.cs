using Application.ExampleChildLists.Commands.CreateExampleChildList;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.TodoLists.Commands.CreateTodoList;
using Application.Users.Commands.CreateUser;

namespace Web.Controllers
{
  public class TodoListControllers : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateTodoListCommand command)
    {
      return await Mediator.Send(command);
    }
  }
}
