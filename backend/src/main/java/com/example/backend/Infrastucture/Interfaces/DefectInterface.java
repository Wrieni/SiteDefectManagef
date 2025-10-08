package com.example.backend.Infrastucture.Interfaces;

import com.example.backend.Domain.DTOs.Defects.*;

import java.util.List;

public interface DefectInterface {
    DefectResponseDTO create(DefectCreateDTO dto);
    DefectResponseDTO getById(Integer id);
    List<DefectResponseDTO> getAll();
    DefectResponseDTO update(Integer id, DefectUpdateDTO dto);
    void delete(Integer id);

    // Attachments
    DefectAttachmentDTO createAttachment(Integer defectId, DefectCreateAttachmentDTO dto);
    DefectAttachmentDTO updateAttachment(Integer attachmentId, DefectUpdateAttachmentDTO dto);
    void deleteAttachment(Integer attachmentId);

    // Comments
    DefectCommentDTO createComment(Integer defectId, DefectCreateCommentDTO dto);
    DefectCommentDTO updateComment(Integer commentId, DefectUpdateCommentsDTO dto);
    void deleteComment(Integer commentId);
}
