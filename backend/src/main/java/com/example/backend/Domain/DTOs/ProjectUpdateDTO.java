package com.example.backend.Domain.DTOs;

import java.time.Instant;

public record ProjectUpdateDTO(
        Integer id,           // ID проекта обязательно для обновления
        String title,
        String description,
        String status,
        Integer managerId,
        Integer executorId,
        Instant deadlineTime,
        String comment
) {
}
