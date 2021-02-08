using Application.ExampleChildLists.Commands.CreateExampleChildList;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users.Commands.CreateUser;

namespace Web.Controllers
{
  public class UserController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateUserCommand command)
    {
      return await Mediator.Send(command);
    }
  }
}
