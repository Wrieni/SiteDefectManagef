package com.example.backend.Domain.DTOs.AuthsDTOs;

public record LoginDTO(String token, String email, String password) {
}
