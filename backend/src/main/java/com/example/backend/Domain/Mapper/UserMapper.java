package com.example.backend.Domain.Mapper;

import com.example.backend.Domain.DTOs.UserDTO;
import com.example.backend.Domain.User;
import com.example.backend.Domain.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    // Entity -> DTO
    @Mapping(source = "role.id", target = "roleId")
    UserDTO toDto(User user);

    // DTO -> Entity
    default User toEntity(UserDTO dto, Role role) {
        if (dto == null) return null;
        User user = new User();
        user.setFirstname(dto.firstname());
        user.setLastname(dto.lastname());
        user.setEmail(dto.email());
        user.setHashPassword(dto.hashPassword());
        user.setIdRole(role); // передаём загруженную роль
        return user;
    }
}
