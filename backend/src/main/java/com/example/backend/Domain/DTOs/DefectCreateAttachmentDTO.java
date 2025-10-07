package com.example.backend.Domain.DTOs;

public record DefectCreateAttachmentDTO(
        String fileName,
        String filePath,
        Integer userId
) {
}
