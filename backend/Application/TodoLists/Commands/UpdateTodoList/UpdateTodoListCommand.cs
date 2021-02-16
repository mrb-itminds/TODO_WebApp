using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Application.Common;
using Application.ExampleEntities.Commands.UpdateExampleEntity;

namespace Application.TodoLists.Commands.UpdateTodoList
{
  public class UpdateTodoListCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public TodoListDto TodoList { get; set; }


    public class UpdateTodoListCommandHandler : IRequestHandler<UpdateTodoListCommand>
    {
      private readonly IApplicationDbContext _context;

      public UpdateTodoListCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(UpdateTodoListCommand request, CancellationToken cancellationToken)
      {
        var exampleEntity = await _context.TodoLists.FindAsync(request.Id);

        if (exampleEntity == null)
        {
          throw new NotFoundException(nameof(Domain.Entities.TodoList), request.Id);
        }

        if (!await _context.TodoLists.AnyAsync(e => e.Id == request.TodoList.UserId, cancellationToken))
        {
          throw new NotFoundException(nameof(User), request.TodoList.UserId);
        }

        exampleEntity.Name = request.TodoList.Name;
        exampleEntity.UserId = request.TodoList.UserId;

        _context.TodoLists.Update(exampleEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
