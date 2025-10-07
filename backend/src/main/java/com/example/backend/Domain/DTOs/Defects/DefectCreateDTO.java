package com.example.backend.Domain.DTOs.Defects;

public record DefectCreateDTO(
        String title,
        String description,
        Integer projectId,
        Integer executorId,
        Integer priority
) {
}


