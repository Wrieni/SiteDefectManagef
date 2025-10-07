package com.example.backend.Domain.Mapper;
import com.example.backend.Domain.DTOs.ProjectCreateDTO;
import com.example.backend.Domain.DTOs.ProjectUpdateDTO;
import com.example.backend.Domain.Project;

import com.example.backend.Domain.User;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    //ProjectCreateDTO -> Project
    Project toEntity(ProjectCreateDTO dto, User manager, User executor);
    // ProjectUpdateDTO -> Project (обновление)
    Project toEntity(ProjectUpdateDTO dto, Project project, User manager, User executor);
}
