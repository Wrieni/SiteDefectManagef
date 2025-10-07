package com.example.backend.Domain.DTOs;

public record DefectCreateCommentDTO(
        String commentText,
        Integer userId
) {
}
