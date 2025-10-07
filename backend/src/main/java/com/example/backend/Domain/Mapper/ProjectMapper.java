package com.example.backend.Domain.Mapper;
import com.example.backend.Domain.DTOs.ProjectCreateDTO;
import com.example.backend.Domain.DTOs.ProjectResponseDTO;
import com.example.backend.Domain.DTOs.ProjectUpdateDTO;
import com.example.backend.Domain.DTOs.UserDTO;
import com.example.backend.Domain.Project;

import com.example.backend.Domain.Role;
import com.example.backend.Domain.User;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    //ProjectCreateDTO -> Project
    Project toEntity(ProjectCreateDTO dto, User manager, User executor);
    // ProjectUpdateDTO -> Project (обновление)
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
