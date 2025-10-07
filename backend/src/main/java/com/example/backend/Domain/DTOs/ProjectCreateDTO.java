package com.example.backend.Domain.DTOs;

import java.time.Instant;

public record ProjectCreateDTO(
        String title,
        String description,
        String status,
        Instant createdAt,
        Integer managerId,
        Instant deadlineTime,
        String comment,
        Integer executorId
) { }
