package com.ynov.fantasyworld.infra.controller;

import com.ynov.fantasyworld.infra.controller.dto.AventurierRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.AventurierResponseDto;
import com.ynov.fantasyworld.infra.controller.dto.PageResponseDto;
import com.ynov.fantasyworld.services.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/aventuriers")
public class AventurierController {

    private final CreerAventurierUseCase creerUseCase;
    private final ListerAventuriersUseCase listerUseCase;
    private final ObtenirAventurierUseCase obtenirUseCase;
    private final SupprimerAventurierUseCase supprimerUseCase;
    private final LogService logService;

    public AventurierController(
            CreerAventurierUseCase creerUseCase,
            ListerAventuriersUseCase listerUseCase,
            ObtenirAventurierUseCase obtenirUseCase,
            SupprimerAventurierUseCase supprimerUseCase,
            LogService logService) {
        this.creerUseCase = creerUseCase;
        this.listerUseCase = listerUseCase;
        this.obtenirUseCase = obtenirUseCase;
        this.supprimerUseCase = supprimerUseCase;
        this.logService = logService;
    }

    @PostMapping
    public ResponseEntity<AventurierResponseDto> creer(
            @Valid @RequestBody AventurierRequestDto dto) {
        AventurierResponseDto response = creerUseCase.executer(dto);
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", response.id() != null ? response.id().toString() : "unknown");
        payload.put("nom", response.nom() != null ? response.nom() : "unknown");
        logService.info("Aventurier créé", payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<PageResponseDto<AventurierResponseDto>> lister(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        PageResponseDto<AventurierResponseDto> response = listerUseCase.executer(page, size);
        Map<String, Object> payload = new HashMap<>();
        payload.put("page", page);
        payload.put("size", size);
        payload.put("total", response.totalElements());
        logService.info("Liste des aventuriers consultée", payload);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AventurierResponseDto> obtenir(
            @PathVariable UUID id) {
        AventurierResponseDto response = obtenirUseCase.executer(id);
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", id.toString());
        payload.put("nom", response.nom() != null ? response.nom() : "unknown");
        logService.info("Aventurier consulté", payload);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimer(
            @PathVariable UUID id) {
        supprimerUseCase.executer(id);
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", id.toString());
        logService.info("Aventurier supprimé", payload);
        return ResponseEntity.noContent().build();
    }
}