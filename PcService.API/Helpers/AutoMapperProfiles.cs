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

            CreateMap<EquipmentForCreationDto, Equipment>();
            CreateMap<Equipment, EquipmentToReturnDto>()
               .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.UserName))
               .ForMember(dest => dest.EmployeeName, opt => opt.MapFrom(src => src.Employee.UserName))
               .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.Name));
            CreateMap<EquipmentForUpdateDto, Equipment>();

            CreateMap<ElementForCreationDto, Element>();
            CreateMap<Element, ElementToReturnDto>()
               .ForMember(dest => dest.ServicemanName, opt => opt.MapFrom(src => src.Serviceman.UserName))
               .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name.Name))
               .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.Name));
            CreateMap<ElementForUpdateDto, Element>();

            CreateMap<ElementName, ElementNameToReturnDto>();
            CreateMap<ElementNameForCreationDto, ElementName>();

            CreateMap<EquipmentStatus, StatusToReturnDto>();
            CreateMap<ElementStatus, StatusToReturnDto>();

            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserToReturnDto>();
            CreateMap<User, UserToEditDto>();
            CreateMap<UserToEditDto, User>();
            CreateMap<User, ContactDetailsToReturnDto>();
        }
    }
}