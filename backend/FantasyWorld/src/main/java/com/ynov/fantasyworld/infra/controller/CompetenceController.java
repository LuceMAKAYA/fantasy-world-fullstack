package com.ynov.fantasyworld.infra.controller;

import com.ynov.fantasyworld.infra.controller.dto.*;
import com.ynov.fantasyworld.services.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/competences")
public class CompetenceController {

    private final ListerCompetencesUseCase listerUseCase;
    private final ObtenirCompetenceUseCase obtenirUseCase;
    private final CreerCompetenceUseCase creerUseCase;
    private final ModifierCompetenceUseCase modifierUseCase;

    public CompetenceController(ListerCompetencesUseCase listerUseCase,
                                ObtenirCompetenceUseCase obtenirUseCase,
                                CreerCompetenceUseCase creerUseCase,
                                ModifierCompetenceUseCase modifierUseCase) {
        this.listerUseCase = listerUseCase;
        this.obtenirUseCase = obtenirUseCase;
        this.creerUseCase = creerUseCase;
        this.modifierUseCase = modifierUseCase;
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<CompetenceResponseDto>> lister(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(listerUseCase.executer(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompetenceResponseDto> obtenir(@PathVariable UUID id) {
        return ResponseEntity.ok(obtenirUseCase.executer(id));
    }

    @PostMapping
    public ResponseEntity<CompetenceResponseDto> creer(
            @Valid @RequestBody CompetenceRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(creerUseCase.executer(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompetenceResponseDto> modifier(
            @PathVariable UUID id,
            @Valid @RequestBody CompetenceRequestDto dto) {
        return ResponseEntity.ok(modifierUseCase.executer(id, dto));
    }
}