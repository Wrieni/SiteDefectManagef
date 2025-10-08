package com.example.backend.Domain.Mapper;

import com.example.backend.Domain.*;
import com.example.backend.Domain.DTOs.Defects.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface DefectMapper {
    DefectMapper INSTANCE = Mappers.getMapper(DefectMapper.class);
    // DefectCreateDTO -> Defect
    @Mapping(target = "title",      expression = "java(dto.title())")
    @Mapping(target = "description",expression = "java(dto.description())")
    @Mapping(target = "priority",   expression = "java(dto.priority())")
    @Mapping(target = "idProject",  expression = "java(project)")
    @Mapping(target = "idExecutor", expression = "java(executor)")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Defect toEntity(DefectCreateDTO dto, Project project, User executor);

    // DefectUpdateDTO -> Defect (обновление существующей сущности)
    // используем @MappingTarget чтобы обновить конкретный объект
    @Mapping(target = "title",       expression = "java(dto.title())")
    @Mapping(target = "description", expression = "java(dto.description())")
    @Mapping(target = "priority",    expression = "java(dto.priority())")
    @Mapping(target = "idExecutor",  expression = "java(executor)")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Defect toEntity(DefectUpdateDTO dto, @MappingTarget Defect defect, User executor);

    // Defect -> DTO
    @Mapping(source = "idExecutor.id", target = "executorId")
    DefectUpdateDTO toUpdateDTO(Defect defect);

    // Attachment DTO -> Entity
    @Mapping(target = "fileName", expression = "java(dto.fileName())")
    @Mapping(target = "filePath", expression = "java(dto.filePath())")
    @Mapping(target = "idDefect", expression = "java(defect)")
    @Mapping(target = "idUser", expression = "java(user)")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    DefectsAttachment toEntity(DefectCreateAttachmentDTO dto, Defect defect, User user);

    @Mapping(target = "idDefect", expression = "java(defect)")
    @Mapping(target = "idUser", expression = "java(user)")
    @Mapping(target = "id", ignore = true)
    DefectsComment toEntity(DefectCreateCommentDTO dto, Defect defect, User user);



    default DefectResponseDTO toDto(Defect d) {
        List<DefectAttachmentDTO> attachments = d.getDefectsAttachments().stream()
                .map(this::toAttachmentDto)
                .collect(Collectors.toList());
        List<DefectCommentDTO> comments = d.getDefectsComments().stream()
                .map(this::toCommentDto)
                .collect(Collectors.toList());

        Integer projId = d.getIdProject() != null ? d.getIdProject().getId() : null;
        Integer execId = d.getIdExecutor() != null ? d.getIdExecutor().getId() : null;

        return new DefectResponseDTO(
                d.getId(),
                d.getTitle(),
                d.getDescription(),
                projId,
                execId,
                d.getPriority(),
                d.getStatus(),
                d.getCreatedAt(),
                d.getUpdatedAt(),
                attachments,
                comments
        );
    }

    default DefectAttachmentDTO toAttachmentDto(DefectsAttachment a) {
        return new DefectAttachmentDTO(
                a.getId(),
                a.getIdDefect() != null ? a.getIdDefect().getId() : null,
                a.getIdUser() != null ? a.getIdUser().getId() : null,
                a.getFileName(),
                a.getFilePath(),
                a.getCreatedAt()
        );
    }

    default DefectCommentDTO toCommentDto(DefectsComment c) {
        return new DefectCommentDTO(
                c.getId(),
                c.getIdDefect() != null ? c.getIdDefect().getId() : null,
                c.getIdUser() != null ? c.getIdUser().getId() : null,
                c.getCommentText(),
                c.getCreatedAt()
        );
    }
}
