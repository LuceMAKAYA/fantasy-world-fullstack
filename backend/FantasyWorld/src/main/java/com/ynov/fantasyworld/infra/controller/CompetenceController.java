package com.ynov.fantasyworld.infra.controller;

import com.ynov.fantasyworld.infra.controller.dto.CompetenceRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResponseDto;
import com.ynov.fantasyworld.services.CreerCompetenceUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/competences")
@CrossOrigin(origins = "http://localhost:5173") // Indispensable pour ton Front sur Mac
public class CompetenceController {

    private final CreerCompetenceUseCase creerCompetenceUseCase;

    public CompetenceController(CreerCompetenceUseCase creerCompetenceUseCase) {
        this.creerCompetenceUseCase = creerCompetenceUseCase;
    }

    @PostMapping
    public ResponseEntity<CompetenceResponseDto> creer(@RequestBody @Valid CompetenceRequestDto dto) {
        // On délègue la logique au UseCase comme pour l'Aventurier
        CompetenceResponseDto response = creerCompetenceUseCase.executer(dto);
        
        // On retourne un code 201 Created avec le résultat
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}