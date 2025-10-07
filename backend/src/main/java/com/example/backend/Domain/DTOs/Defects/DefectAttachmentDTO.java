package com.example.backend.Domain.DTOs.Defects;

import java.time.Instant;

public record DefectAttachmentDTO(
        Integer id,
        Integer defectId,
        Integer userId,
        String fileName,
        String filePath,
        Instant createdAt
) {
}
