package com.example.backend.Domain.DTOs.Defects;

import java.time.Instant;

public record DefectHistoryDTO(
        Integer id,
        Integer defectId,
        Integer userId,
        String fileName,
        String oldValue,
        String newValue,
        Instant changedAt
) {
}
