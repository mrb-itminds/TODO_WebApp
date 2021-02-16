using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Application.TodoLists;

namespace Application.TodoLists.Queries.GetTodoLists
{
  public class GetTodoListsQuery : IRequest<List<TodoListIdDto>>
  {
    public class GetTodoListsQueryHandler : IRequestHandler<GetTodoListsQuery, List<TodoListIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetTodoListsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<TodoListIdDto>> Handle(GetTodoListsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.TodoLists
          .Include(x => x.TodoItems)
          .ProjectTo<TodoListIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);


        return viewModel;
      }
    }
  }
}
