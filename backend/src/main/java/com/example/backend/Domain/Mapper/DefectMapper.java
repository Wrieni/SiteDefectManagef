package com.example.backend.Domain.Mapper;

import com.example.backend.Domain.*;
import com.example.backend.Domain.DTOs.DefectCreateAttachmentDTO;
import com.example.backend.Domain.DTOs.DefectCreateCommentDTO;
import com.example.backend.Domain.DTOs.DefectCreateDTO;
import com.example.backend.Domain.DTOs.DefectUpdateDTO;
import com.example.backend.Domain.*;
import com.example.backend.Domain.DTOs.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
@Mapper(componentModel = "spring")
public interface DefectMapper {
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

}
