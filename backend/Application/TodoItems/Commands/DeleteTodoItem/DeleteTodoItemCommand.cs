using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.TodoItems.Commands.DeleteTodoItem
{
  public class DeleteTodoItemCommand : IRequest
  {
    public int Id { get; set; }

    public class DeleteTodoItemCommandHandler : IRequestHandler<DeleteTodoItemCommand>
    {
      private readonly IApplicationDbContext _context;

      public DeleteTodoItemCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }
      public async Task<Unit> Handle(DeleteTodoItemCommand request, CancellationToken cancellationToken)
      {
        var exampleEntity = await _context.TodoItems.FindAsync(request.Id);

        if (exampleEntity == null)
        {
          throw new NotFoundException(nameof(TodoItem), request.Id);
        }

        _context.TodoItems.Remove(exampleEntity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
