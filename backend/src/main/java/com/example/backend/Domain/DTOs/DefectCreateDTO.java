package com.example.backend.Domain.DTOs;

import java.time.Instant;

public record DefectCreateDTO(
        String title,
        String description,
        Integer projectId,
        Integer executorId,
        Integer priority
) {
}


