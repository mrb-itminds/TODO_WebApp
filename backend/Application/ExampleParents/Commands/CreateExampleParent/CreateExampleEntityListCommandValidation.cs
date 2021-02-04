using FluentValidation;

namespace Application.ExampleChildLists.Commands.CreateExampleChildList
{
  public class CreateExampleParentCommandValidation : AbstractValidator<CreateExampleParentCommand>
  {
    public CreateExampleParentCommandValidation()
    {
      RuleFor(e => e.Parent.Name)
          .MaximumLength(200)
          .NotEmpty();
    }
  }
}
