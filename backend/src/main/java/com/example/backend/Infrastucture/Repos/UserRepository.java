package com.example.backend.Infrastucture.Repos;

import com.example.backend.Domain.User;
import org.springframework.data.repository.Repository;

public interface UserRepository extends Repository<User, Integer> {
}