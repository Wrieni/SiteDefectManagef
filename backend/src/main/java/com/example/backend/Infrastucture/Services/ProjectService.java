package com.example.backend.Infrastucture.Services;

import com.example.backend.Domain.DTOs.ProjectCreateDTO;
import com.example.backend.Domain.DTOs.ProjectResponseDTO;
import com.example.backend.Domain.DTOs.ProjectUpdateDTO;
import com.example.backend.Domain.Mapper.ProjectMapper;
import com.example.backend.Domain.Project;
import com.example.backend.Domain.User;
import com.example.backend.Infrastucture.Repos.ProjectRepository;
import com.example.backend.Infrastucture.Repos.UserRepository;
import com.example.backend.Infrastucture.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.ReadOnlyFileSystemException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    public ProjectService(UserRepository userRepository, ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    public ProjectResponseDTO createProject(ProjectCreateDTO projectCreateDTO) {
        Project project = new Project();
        project.setTitle(projectCreateDTO.title());
        project.setDescription(projectCreateDTO.description());
        project.setStatus(projectCreateDTO.status() != null ? projectCreateDTO.status() : "new");
        if (projectCreateDTO.createdAt() != null) {
            project.setCreatedAt(projectCreateDTO.createdAt());}
        if (projectCreateDTO.managerId() != null) {
            User manager = userRepository.findById(projectCreateDTO.managerId()).orElseThrow(() -> new ResourceNotFoundException("Manager not found with id = " + projectCreateDTO.managerId()));
            project.setIdManager(manager);
        }
        project.setDeadlineTime(projectCreateDTO.deadlineTime());
        project.setComment(projectCreateDTO.comment());
        if (projectCreateDTO.executorId() != null) {
            User executor = userRepository.findById(projectCreateDTO.executorId()).orElseThrow(() -> new ResourceNotFoundException("Executor not found with id = " + projectCreateDTO.managerId()));
            project.setIdExecutor(executor);
        }
        Project saved = projectRepository.save(project);
        return projectMapper.toDto(saved);
    }


    @Transactional(readOnly = true)
    public ProjectResponseDTO getById(Integer id) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id = " + id));
        return projectMapper.toDto(p);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponseDTO> getAll() {
        return projectRepository.findAll().stream()
                .map(ProjectMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
    }
    public ProjectResponseDTO update(Integer id, ProjectUpdateDTO dto) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id = " + id));

        if (dto.title() != null) p.setTitle(dto.title());
        if (dto.description() != null) p.setDescription(dto.description());
        if (dto.status() != null) p.setStatus(dto.status());
        if (dto.deadlineTime() != null) p.setDeadlineTime(dto.deadlineTime());
        if (dto.comment() != null) p.setComment(dto.comment());

        if (dto.managerId() != null) {
            User manager = userRepository.findById(dto.managerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Manager not found with id = " + dto.managerId()));
            p.setIdManager(manager);
        }

        if (dto.executorId() != null) {
            User executor = userRepository.findById(dto.executorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Executor not found with id = " + dto.executorId()));
            p.setIdExecutor(executor);
        }

        Project updated = projectRepository.save(p);
        return projectMapper.toDto(updated);
    }

    public void delete(Integer id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id = " + id);
        }
        projectRepository.deleteById(id);
    }
}
