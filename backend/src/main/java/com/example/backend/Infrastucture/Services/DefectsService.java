package com.example.backend.Infrastucture.Services;

import com.example.backend.Domain.*;
import com.example.backend.Domain.DTOs.Defects.*;
import com.example.backend.Domain.Mapper.DefectMapper;
import com.example.backend.Infrastucture.Interfaces.DefectInterface;
import com.example.backend.Infrastucture.Repos.*;
import com.example.backend.Infrastucture.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DefectsService implements DefectInterface {
    private final DefectRepository defectRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final DefectsAttachmentRepository attachmentRepository;
    private final DefectsCommentRepository commentRepository;
    private final DefectMapper defectMapper;

    public DefectsService(
            DefectRepository defectRepository,
            ProjectRepository projectRepository,
            UserRepository userRepository,
            DefectsAttachmentRepository attachmentRepository,
            DefectsCommentRepository commentRepository, DefectMapper defectMapper
    ) {
        this.defectRepository = defectRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.attachmentRepository = attachmentRepository;
        this.commentRepository = commentRepository;
        this.defectMapper = defectMapper;
    }

    @Override
    public DefectResponseDTO create(DefectCreateDTO dto) {
        Defect d = new Defect();
        d.setTitle(dto.title());
        d.setDescription(dto.description());
        d.setPriority(dto.priority());
        d.setStatus(dto.priority() == null ? "Новая" : "Новая"); // default
        d.setCreatedAt(Instant.now());

        if (dto.projectId() != null) {
            Project p = projectRepository.findById(dto.projectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + dto.projectId()));
            d.setIdProject(p);
        }

        if (dto.executorId() != null) {
            User u = userRepository.findById(dto.executorId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.executorId()));
            d.setIdExecutor(u);
        }

        Defect saved = defectRepository.save(d);
        return defectMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public DefectResponseDTO getById(Integer id) {
        Defect d = defectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Defect not found: " + id));
        return defectMapper.toDto(d);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DefectResponseDTO> getAll() {
        return defectRepository.findAll().stream()
                .map(defectMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public DefectResponseDTO update(Integer id, DefectUpdateDTO dto) {
        Defect d = defectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Defect not found: " + id));

        if (dto.title() != null) d.setTitle(dto.title());
        if (dto.description() != null) d.setDescription(dto.description());
        if (dto.priority() != null) d.setPriority(dto.priority());
        if (dto.status() != null) d.setStatus(dto.status());
        d.setUpdatedAt(Instant.now());

        if (dto.executorId() != null) {
            User u = userRepository.findById(dto.executorId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.executorId()));
            d.setIdExecutor(u);
        }

        Defect saved = defectRepository.save(d);
        return defectMapper.toDto(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!defectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Defect not found: " + id);
        }
        defectRepository.deleteById(id);
    }

    //  Attachments
    @Override
    public DefectAttachmentDTO createAttachment(Integer defectId, DefectCreateAttachmentDTO dto) {
        Defect defect = defectRepository.findById(defectId)
                .orElseThrow(() -> new ResourceNotFoundException("Defect not found: " + defectId));
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.userId()));

        DefectsAttachment a = new DefectsAttachment();
        a.setIdDefect(defect);
        a.setIdUser(user);
        a.setFileName(dto.fileName());
        a.setFilePath(dto.filePath());
        a.setCreatedAt(Instant.now());

        DefectsAttachment saved = attachmentRepository.save(a);
        return defectMapper.toAttachmentDto(saved);
    }

    @Override
    public DefectAttachmentDTO updateAttachment(Integer attachmentId, DefectUpdateAttachmentDTO dto) {
        DefectsAttachment a = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Attachment not found: " + attachmentId));

        if (dto.fileName() != null) a.setFileName(dto.fileName());
        if (dto.filePath() != null) a.setFilePath(dto.filePath());
        if (dto.userId() != null) {
            User u = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.userId()));
            a.setIdUser(u);
        }
        if (dto.defectId() != null) {
            Defect d = defectRepository.findById(dto.defectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Defect not found: " + dto.defectId()));
            a.setIdDefect(d);
        }

        DefectsAttachment saved = attachmentRepository.save(a);
        return defectMapper.toAttachmentDto(saved);
    }

    @Override
    public void deleteAttachment(Integer attachmentId) {
        if (!attachmentRepository.existsById(attachmentId)) {
            throw new ResourceNotFoundException("Attachment not found: " + attachmentId);
        }
        attachmentRepository.deleteById(attachmentId);
    }

    // Comments
    @Override
    public DefectCommentDTO createComment(Integer defectId, DefectCreateCommentDTO dto) {
        Defect defect = defectRepository.findById(defectId)
                .orElseThrow(() -> new ResourceNotFoundException("Defect not found: " + defectId));
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.userId()));

        DefectsComment c = new DefectsComment();
        c.setIdDefect(defect);
        c.setIdUser(user);
        c.setCommentText(dto.commentText());
        c.setCreatedAt(Instant.now());

        DefectsComment saved = commentRepository.save(c);
        return defectMapper.toCommentDto(saved);
    }

    @Override
    public DefectCommentDTO updateComment(Integer commentId, DefectUpdateCommentsDTO dto) {
        DefectsComment c = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found: " + commentId));

        if (dto.commentText() != null) c.setCommentText(dto.commentText());
        if (dto.userId() != null) {
            User u = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.userId()));
            c.setIdUser(u);
        }
        if (dto.defectId() != null) {
            Defect d = defectRepository.findById(dto.defectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Defect not found: " + dto.defectId()));
            c.setIdDefect(d);
        }

        DefectsComment saved = commentRepository.save(c);
        return defectMapper.toCommentDto(saved);
    }

    @Override
    public void deleteComment(Integer commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new ResourceNotFoundException("Comment not found: " + commentId);
        }
        commentRepository.deleteById(commentId);
    }

}
