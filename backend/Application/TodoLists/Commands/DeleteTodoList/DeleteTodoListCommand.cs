using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.TodoLists.Commands.DeleteTodoList
{
  public class DeleteTodoListCommand : IRequest
  {
    public int Id { get; set; }

    public class DeleteTodoListCommandHandler : IRequestHandler<DeleteTodoListCommand>
    {
      private readonly IApplicationDbContext _context;

      public DeleteTodoListCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }
      public async Task<Unit> Handle(DeleteTodoListCommand request, CancellationToken cancellationToken)
      {
        var exampleEntity = await _context.TodoLists.FindAsync(request.Id);

        if (exampleEntity == null)
        {
          throw new NotFoundException(nameof(TodoItem), request.Id);
        }

        _context.TodoLists.Remove(exampleEntity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
