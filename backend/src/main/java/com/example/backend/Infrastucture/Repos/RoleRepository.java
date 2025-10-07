package com.example.backend.Infrastucture.Repos;

import com.example.backend.Domain.Role;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface RoleRepository extends Repository<Role, Integer> {
    Optional<Role> findByName(String name);
    Optional<Role> findById(Integer id);
}