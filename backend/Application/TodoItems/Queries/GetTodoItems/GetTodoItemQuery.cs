using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.ExampleChildren;
using Application.ExampleEntities;
using Application.ExampleEntities.Queries.GetExampleChildren;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.TodoItems.Commands.Queries.GetTodoItems
{
  public class GetTodoItemsQuery : IRequest<List<TodoItemIdDto>>
  {
    public class GetTodoItemsQueryHandler : IRequestHandler<GetTodoItemsQuery, List<TodoItemIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetTodoItemsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<TodoItemIdDto>> Handle(GetTodoItemsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.TodoItems
                .Include(x => x.User)
                .ProjectTo<TodoItemIdDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);


        return viewModel;
      }
    }
  }
}
