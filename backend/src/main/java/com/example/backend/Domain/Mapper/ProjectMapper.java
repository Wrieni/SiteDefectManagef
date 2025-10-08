package com.example.backend.Domain.Mapper;
import com.example.backend.Domain.DTOs.ProjectCreateDTO;
import com.example.backend.Domain.DTOs.ProjectResponseDTO;
import com.example.backend.Domain.DTOs.ProjectUpdateDTO;
import com.example.backend.Domain.DTOs.UserDTO;
import com.example.backend.Domain.Project;

import com.example.backend.Domain.Role;
import com.example.backend.Domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    //ProjectCreateDTO -> Project
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "title", expression = "java(dto.title())")
    @Mapping(target = "description", expression = "java(dto.description())")
    @Mapping(target = "status", expression = "java(dto.status())")
    @Mapping(target = "idManager", expression = "java(manager)")
    @Mapping(target = "idExecutor", expression = "java(executor)")
    @Mapping(target = "deadlineTime", expression = "java(dto.deadlineTime())")
    @Mapping(target = "comment", expression = "java(dto.comment())")
    @Mapping(target = "defects", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Project toEntity(ProjectCreateDTO dto, User manager, User executor);
    // ProjectUpdateDTO -> Project (обновление)
    @Mapping(target = "id", expression = "java(dto.id())")
    @Mapping(target = "title", expression = "java(dto.title())")
    @Mapping(target = "description", expression = "java(dto.description())")
    @Mapping(target = "status", expression = "java(dto.status())")
    @Mapping(target = "idManager", expression = "java(manager)")
    @Mapping(target = "idExecutor", expression = "java(executor)")
    @Mapping(target = "deadlineTime", expression = "java(dto.deadlineTime())")
    @Mapping(target = "comment", expression = "java(dto.comment())")
    @Mapping(target = "defects", ignore = true)
    Project toEntity(ProjectUpdateDTO dto, Project project, User manager, User executor);

    default ProjectResponseDTO toDto(Project p) {
        if  (p == null) {
            return null;
        }
        Project project = new Project();
        project.setId(p.getId());
        project.setTitle(p.getTitle());
        project.setDescription(p.getDescription());
        project.setIdExecutor(p.getExecutor());
        project.setIdManager(p.getManager());
        project.setDeadlineTime(p.getDeadlineTime());
        project.setComment(p.getComment());
        project.setStatus(p.getStatus());
        project.setCreatedAt(project.getCreatedAt());
        return toDto(project);
    }

}
