package com.ynov.fantasyworld.infra.controller;

import com.ynov.fantasyworld.infra.controller.dto.CompetenceRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResponseDto;
import com.ynov.fantasyworld.infra.controller.dto.PageResponseDto;
import com.ynov.fantasyworld.services.CreerCompetenceUseCase;
import com.ynov.fantasyworld.services.ListerCompetencesUseCase;
import com.ynov.fantasyworld.services.SupprimerCompetenceUseCase; // Import ajouté
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID; // Import indispensable pour l'ID

@RestController
@RequestMapping("/competences")
@CrossOrigin(origins = "http://localhost:5173")
public class CompetenceController {

    private final CreerCompetenceUseCase creerCompetenceUseCase;
    private final ListerCompetencesUseCase listerUseCase;
    private final SupprimerCompetenceUseCase supprimerUseCase; // Ajouté

    public CompetenceController(
            CreerCompetenceUseCase creerCompetenceUseCase,
            ListerCompetencesUseCase listerUseCase,
            SupprimerCompetenceUseCase supprimerUseCase) { // Injecté ici
        this.creerCompetenceUseCase = creerCompetenceUseCase;
        this.listerUseCase = listerUseCase;
        this.supprimerUseCase = supprimerUseCase;
    }

    @PostMapping
    public ResponseEntity<CompetenceResponseDto> creer(@RequestBody @Valid CompetenceRequestDto dto) {
        CompetenceResponseDto response = creerCompetenceUseCase.executer(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<CompetenceResponseDto>> lister(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(listerUseCase.executer(page, size));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Renvoie bien le code 204
    public void supprimerCompetence(@PathVariable UUID id) {
        // Utilisation du UseCase pour rester cohérent avec ton arborescence
        supprimerUseCase.execute(id);
    }
}