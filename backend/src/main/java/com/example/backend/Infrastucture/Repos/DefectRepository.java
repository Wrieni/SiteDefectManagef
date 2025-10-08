package com.example.backend.Infrastucture.Repos;

import com.example.backend.Domain.Defect;
import org.springframework.data.repository.Repository;

import java.util.Collection;
import java.util.Optional;

public interface DefectRepository extends Repository<Defect, Integer> {
    Defect save(Defect d);

    Optional<Defect> findById(Integer id);

    Collection<Defect> findAll();

    boolean existsById(Integer id);

    void deleteById(Integer id);
}