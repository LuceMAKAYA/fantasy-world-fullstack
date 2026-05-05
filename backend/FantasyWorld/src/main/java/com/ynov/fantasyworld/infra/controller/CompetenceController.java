package com.ynov.fantasyworld.infra.controller;

import com.ynov.fantasyworld.infra.controller.dto.CompetenceRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResponseDto;
import com.ynov.fantasyworld.infra.controller.dto.PageResponseDto;
import com.ynov.fantasyworld.services.CreerCompetenceUseCase;
import com.ynov.fantasyworld.services.ListerCompetencesUseCase;
import com.ynov.fantasyworld.services.ModifierCompetenceUseCase;
import com.ynov.fantasyworld.services.ObtenirCompetenceUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/competences")
@CrossOrigin(origins = "http://localhost:5173") // Indispensable pour ton Front sur Mac
public class CompetenceController {

    private final CreerCompetenceUseCase creerCompetenceUseCase;
    private final ListerCompetencesUseCase listerUseCase;
    private final ObtenirCompetenceUseCase obtenirUseCase;
    private final ModifierCompetenceUseCase modifierUseCase;


    public CompetenceController(CreerCompetenceUseCase creerCompetenceUseCase,
                                ListerCompetencesUseCase listerUseCase,
                                ObtenirCompetenceUseCase obtenirUseCase,
                                        ModifierCompetenceUseCase modifierUseCase) {
        this.creerCompetenceUseCase = creerCompetenceUseCase;
        this.listerUseCase = listerUseCase;
        this.obtenirUseCase = obtenirUseCase;
        this.modifierUseCase = modifierUseCase;
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompetenceResponseDto> modifier(
            @PathVariable UUID id,
            @RequestBody @Valid CompetenceRequestDto dto) {
        return ResponseEntity.ok(modifierUseCase.executer(id, dto));
    }

    @PostMapping
    public ResponseEntity<CompetenceResponseDto> creer(@RequestBody @Valid CompetenceRequestDto dto) {
        // On délègue la logique au UseCase comme pour l'Aventurier
        CompetenceResponseDto response = creerCompetenceUseCase.executer(dto);
        
        // On retourne un code 201 Created avec le résultat
        return new ResponseEntity<>(response, HttpStatus.CREATED);
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
}