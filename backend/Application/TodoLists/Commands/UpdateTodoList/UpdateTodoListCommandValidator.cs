using FluentValidation;

namespace Application.TodoLists.Commands.UpdateTodoList
{
  public class UpdateTodoListCommandValidator : AbstractValidator<UpdateTodoListCommand>
  {
    public UpdateTodoListCommandValidator()
    {
      RuleFor(e => e.TodoList)
        .NotNull();
      RuleFor(e => e.TodoList.Name)
        .MaximumLength(200)
        .NotEmpty();
      RuleFor(e => e.TodoList.UserId)
        .NotNull();
    }
  }
}
