package com.example.backend.Domain.DTOs.Defects;

import java.time.Instant;
import java.util.List;

public record DefectResponseDTO(
        Integer id,
        String title,
        String description,
        Integer projectId,
        Integer executorId,
        Integer priority,
        String status,
        Instant createdAt,
        Instant updatedAt,
        List<DefectAttachmentDTO> attachments,
        List<DefectCommentDTO> comments
) {
}
