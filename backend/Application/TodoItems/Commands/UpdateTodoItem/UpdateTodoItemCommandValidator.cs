using FluentValidation;

namespace Application.TodoItems.Commands.UpdateTodoItem
{
  public class UpdateTodoItemCommandValidator : AbstractValidator<UpdateTodoItemCommand>
  {

    public UpdateTodoItemCommandValidator()
    {
      RuleFor(e => e.TodoItem)
          .NotNull();
      RuleFor(e => e.TodoItem.Name)
          .MaximumLength(200)
          .NotEmpty();
      RuleFor(e => e.TodoItem.Type)
          .IsInEnum()
          .NotNull();
      RuleFor(e => e.TodoItem.TodoListId)
          .NotNull();
    }
  }
}
