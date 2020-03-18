using AutoMapper;
using PcService.API.Dtos;
using PcService.API.Models;

namespace PcService.API.Helpers
{
   public class AutoMapperProfiles : Profile
   {
      public AutoMapperProfiles()
      {
         CreateMap<UserForRegisterDto, UserForLoginDto>();
         CreateMap<Equipment, EquipmentToReturnDto>();
         CreateMap<EquipmentForCreationDto, Equipment>();
         CreateMap<Equipment, EquipmentToReturnDto>()
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.UserName));
         CreateMap<EquipmentForUpdateDto, Equipment>();
         CreateMap<ElementForCreationDto, Element>();
      }
   }
}