using Application.TodoItems.Commands.CreateTodoItem;
using FluentValidation;

namespace Application.ExampleChildren.Commands.CreateExampleChild
{
  public class CreateTodoItemCommandValidator : AbstractValidator<CreateTodoItemCommand>
  {
    public CreateTodoItemCommandValidator()
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
