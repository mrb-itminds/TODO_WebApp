using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.ExampleEntities;
using Domain.Entities;
using MediatR;

namespace Application.TodoItems.Commands.CreateTodoItem
{
  public class CreateTodoItemCommand : IRequest<int>
  {
    public TodoItemDto TodoItem;

    public class CreateTodoItemCommandHandler : IRequestHandler<CreateTodoItemCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateTodoItemCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateTodoItemCommand request, CancellationToken cancellationToken)
      {
        var exampleEntity = new TodoItem
        {
          Name = request.TodoItem.Name,
          Type = request.TodoItem.Type,
          UserId = request.TodoItem.UserId,
        };

        _context.TodoItems.Add(exampleEntity);

        await _context.SaveChangesAsync(cancellationToken);

        return exampleEntity.Id;
      }
    }
  }
}
