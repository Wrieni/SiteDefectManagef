package com.example.backend.Infrastucture.Repos;

import com.example.backend.Domain.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, Integer> {
    Optional<User> findByEmail(String email);
}