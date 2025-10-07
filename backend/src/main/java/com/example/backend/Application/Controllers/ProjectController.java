package com.example.backend.Application.Controllers;

import com.example.backend.Domain.DTOs.ProjectCreateDTO;
import com.example.backend.Domain.DTOs.ProjectResponseDTO;
import com.example.backend.Domain.DTOs.ProjectUpdateDTO;
import com.example.backend.Infrastucture.Services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
class ProjectController {
    private final ProjectService projectService;
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }
    @PostMapping
    public ResponseEntity<ProjectResponseDTO> create(@RequestBody ProjectCreateDTO dto) {
        ProjectResponseDTO created = projectService.createProject(dto);
        URI location = URI.create("/api/projects/" + created.id());
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAll() {
        return ResponseEntity.ok(projectService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> update(@PathVariable Integer id,
                                                     @RequestBody ProjectUpdateDTO dto) {
        return ResponseEntity.ok(projectService.update(id, dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
