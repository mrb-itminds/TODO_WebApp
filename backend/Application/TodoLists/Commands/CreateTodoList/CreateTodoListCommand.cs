using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Users;
using Application.Users.Commands.CreateUser;
using Domain.Entities;
using MediatR;

namespace Application.TodoLists.Commands.CreateTodoList
{
  public class CreateTodoListCommand : IRequest<int>
  {
    public TodoListDto TodoList { get; set; }


    public class CreateTodoListCommandHandler : IRequestHandler<CreateTodoListCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateTodoListCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }
      public async Task<int> Handle(CreateTodoListCommand request, CancellationToken cancellationToken)
      {

        var todoList = new TodoList
        {
          Name = request.TodoList.Name,
          UserId = request.TodoList.UserId
        };

        _context.TodoLists.Add(todoList);

        await _context.SaveChangesAsync(cancellationToken);

        return todoList.Id;
      }
    }
  }
}
