using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Users.Commands.CreateUser
{
  public class CreateUserCommand : IRequest<int>
  {
    public UserDto Parent { get; set; }


    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateUserCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }
      public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
      {

        var user = new User
        {
          Name = request.Parent.Name
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync(cancellationToken);

        return user.Id;
      }
    }
  }
}
