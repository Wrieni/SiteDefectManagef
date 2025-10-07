package com.example.backend.Domain.DTOs;

public record DefectUpdateCommentsDTO(
        Integer defectId,
        String commentText,
        Integer userId
) {
}
