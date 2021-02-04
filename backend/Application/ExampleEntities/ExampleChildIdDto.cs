using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.ExampleChildren
{
  public class ExampleChildIdDto : ExampleChildDto, IAutoMap<ExampleChild>
  {
    public int Id { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<ExampleChild, ExampleChildIdDto>()
        .IncludeBase<ExampleChild, ExampleChildDto>();
    }
  }
}
