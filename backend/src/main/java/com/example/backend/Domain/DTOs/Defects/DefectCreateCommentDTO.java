package com.example.backend.Domain.DTOs.Defects;

public record DefectCreateCommentDTO(
        String commentText,
        Integer userId
) {
}
