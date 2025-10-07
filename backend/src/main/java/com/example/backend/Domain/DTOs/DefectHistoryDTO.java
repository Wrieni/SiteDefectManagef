package com.example.backend.Domain.DTOs;

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
