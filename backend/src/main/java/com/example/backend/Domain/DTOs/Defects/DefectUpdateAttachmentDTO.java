package com.example.backend.Domain.DTOs.Defects;

public record DefectUpdateAttachmentDTO(
        Integer defectId,
        String fileName,
        String filePath,
        Integer userId
) {
}
