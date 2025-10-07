package com.example.backend.Domain.DTOs;

public record DefectUpdateDTO(
        Integer id,
        String title,
        String description,
        Integer executorId,
        Integer priority,
        String status
) {
}
