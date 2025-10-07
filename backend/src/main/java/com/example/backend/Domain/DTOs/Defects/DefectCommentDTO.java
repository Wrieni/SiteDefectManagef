package com.example.backend.Domain.DTOs.Defects;

import java.time.Instant;

public record DefectCommentDTO(
        Integer id,
        Integer defectId,
        Integer userId,
        String commentText,
        Instant createdAt
) {
}
