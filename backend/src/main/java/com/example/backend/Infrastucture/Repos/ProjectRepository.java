package com.example.backend.Infrastucture.Repos;

import com.example.backend.Domain.Project;
import org.springframework.data.repository.Repository;

import java.util.Collection;
import java.util.Optional;

public interface ProjectRepository extends Repository<Project, Integer> {
    Project save(Project project);

    Optional<Project> findById(Integer id);

    Collection<Project> findAll();

    boolean existsById(Integer id);

    void deleteById(Integer id);
}