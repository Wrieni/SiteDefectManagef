package com.example.backend.Domain.DTOs;

public record UserDTO(
        String firstname,
        String lastname,
        String email,
        String hashPassword,
        Integer roleId
) {
}
