using Application.Common.Mappings;
using AutoMapper;

namespace Application.Users
{
  public class UserDto : IAutoMap<Domain.Entities.User>
  {
    public string Name { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<Domain.Entities.User, UserDto>();
    }
  }
}
