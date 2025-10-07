package com.example.backend.Domain.DTOs.Defects;

public record DefectUpdateCommentsDTO(
        Integer defectId,
        String commentText,
        Integer userId
) {
}
