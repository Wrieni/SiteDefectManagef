package com.example.backend.Application.Controllers;

import com.example.backend.Domain.DTOs.Defects.DefectCreateDTO;
import com.example.backend.Domain.DTOs.Defects.DefectResponseDTO;
import com.example.backend.Domain.DTOs.Defects.DefectUpdateDTO;
import com.example.backend.Domain.User;
import com.example.backend.Infrastucture.Services.DefectsService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/project/{id}/details")
class DefectsController {
    private final DefectsService defectsService;
    public DefectsController(DefectsService defectsService) {
        this.defectsService = defectsService;
    }

    @PostMapping
    public ResponseEntity<DefectResponseDTO> createDefect(DefectCreateDTO dto) {
        DefectResponseDTO defect = defectsService.create(dto);
        return ResponseEntity.ok().body(defect);
    }

    @GetMapping
    public ResponseEntity<DefectResponseDTO> getDefectById(@PathVariable Integer id) {
        return ResponseEntity.ok(defectsService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<DefectResponseDTO>> getAllsDefects() {
        return ResponseEntity.ok(defectsService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DefectResponseDTO> update(@PathVariable Integer id, @RequestBody DefectUpdateDTO dto) {
        return ResponseEntity.ok(defectsService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        defectsService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
