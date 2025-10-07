package com.example.backend.Domain.DTOs.Defects;

public record DefectCreateAttachmentDTO(
        String fileName,
        String filePath,
        Integer userId
) {
}
