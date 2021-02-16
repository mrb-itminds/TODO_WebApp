using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Application.ExampleEntities;
using Application.ExampleEntities.Commands.UpdateExampleEntity;

namespace Application.TodoItems.Commands.UpdateTodoItem
{
  public class UpdateTodoItemCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public TodoItemDto TodoItem { get; set; }


    public class UpdateTodoItemCommandHandler : IRequestHandler<UpdateTodoItemCommand>
    {
      private readonly IApplicationDbContext _context;

      public UpdateTodoItemCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(UpdateTodoItemCommand request, CancellationToken cancellationToken)
      {
        var exampleEntity = await _context.TodoItems.FindAsync(request.Id);

        if (exampleEntity == null)
        {
          throw new NotFoundException(nameof(Domain.Entities.TodoItem), request.Id);
        }

        if (!await _context.TodoItems.AnyAsync(e => e.Id == request.TodoItem.TodoListId, cancellationToken))
        {
          throw new NotFoundException(nameof(User), request.TodoItem.TodoListId);
        }

        exampleEntity.Name = request.TodoItem.Name;
        exampleEntity.Type = request.TodoItem.Type;
        exampleEntity.TodoListId = request.TodoItem.TodoListId;

        _context.TodoItems.Update(exampleEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
