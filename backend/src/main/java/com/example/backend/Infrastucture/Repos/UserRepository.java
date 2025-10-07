package com.example.backend.Infrastucture.Repos;

import com.example.backend.Domain.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, Integer> {
    User save(User user);
    Optional<User> findByEmail(String email);
    Optional<User> findById(Integer id);
}