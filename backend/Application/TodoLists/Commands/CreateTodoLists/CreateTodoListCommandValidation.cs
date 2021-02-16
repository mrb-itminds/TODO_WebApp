using Application.TodoLists.Commands.CreateTodoList;
using FluentValidation;

namespace Application.TodoLists.Commands.CreateTodoList
{
  public class CreateTodoListCommandValidation : AbstractValidator<CreateTodoListCommand>
  {
    public CreateTodoListCommandValidation()
    {
      RuleFor(e => e.TodoList.Name)
          .MaximumLength(200)
          .NotEmpty();
    }
  }
}
