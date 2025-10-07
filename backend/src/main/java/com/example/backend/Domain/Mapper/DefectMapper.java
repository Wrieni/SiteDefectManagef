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
import org.mapstruct.Named;
@Mapper(componentModel = "spring")
public interface DefectMapper {

        // DefectCreateDTO -> Defect
        @Mapping(source = "projectId", target = "idProject")
        @Mapping(source = "executorId", target = "idExecutor")
        Defect toEntity(DefectCreateDTO dto, Project project, User executor);

        // DefectUpdateDTO -> Defect
        @Mapping(source = "executorId", target = "idExecutor")
        Defect toEntity(DefectUpdateDTO dto, Defect defect, User executor);

        // Defect -> DTO
        @Mapping(source = "idProject.id", target = "projectId")
        @Mapping(source = "idExecutor.id", target = "executorId")
        DefectUpdateDTO toUpdateDTO(Defect defect);

        // Attachment DTO -> Entity
        @Mapping(source = "userId", target = "idUser")
        DefectsAttachment toEntity(DefectCreateAttachmentDTO dto, Defect defect, User user);

        // Comment DTO -> Entity
        @Mapping(source = "userId", target = "idUser")
        DefectsComment toEntity(DefectCreateCommentDTO dto, Defect defect, User user);

}
