package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResponseDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ModifierCompetenceUseCase {

    private final CompetenceRepository repository;

    public ModifierCompetenceUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public CompetenceResponseDto executer(UUID id, CompetenceRequestDto dto) {
        Competence existante = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compétence non trouvée : " + id));

        // Charge les prérequis
        List<Competence> prerequis = new ArrayList<>();
        if (dto.competencesRequises() != null && !dto.competencesRequises().isEmpty()) {
            prerequis = new ArrayList<>(repository.findAllById(dto.competencesRequises()));
        }

        // Met à jour les champs
        existante.setNom(dto.nom());
        existante.setDescription(dto.description());
        existante.setClasseRequise(dto.classeRequise());
        existante.setNiveauMinimum(dto.niveauMinimum());
        existante.setCaracteristiqueMin(dto.caracteristiqueMin());
        existante.setCompetencesRequises(prerequis);

        Competence saved = repository.save(existante);
        return CompetenceResponseDto.from(saved);
    }
}