using FluentValidation;

namespace Application.Users.Commands.CreateUser
{
  public class CreateUserCommandValidation : AbstractValidator<CreateUserCommand>
  {
    public CreateUserCommandValidation()
    {
      RuleFor(e => e.Parent.Name)
          .MaximumLength(200)
          .NotEmpty();
    }
  }
}
