using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.ExampleParents.Commands.CreateExampleParent
{
  public class CreateExampleParentCommand : IRequest<int>
  {
    public ExampleParentDto Parent { get; set; }


    public class CreateExampleParentCommandHandler : IRequestHandler<CreateExampleParentCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateExampleParentCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }
      public async Task<int> Handle(CreateExampleParentCommand request, CancellationToken cancellationToken)
      {

        var parent = new ExampleParent
        {
          Name = request.Parent.Name
        };

        _context.ExampleParents.Add(parent);

        await _context.SaveChangesAsync(cancellationToken);

        return parent.Id;
      }
    }
  }
}
