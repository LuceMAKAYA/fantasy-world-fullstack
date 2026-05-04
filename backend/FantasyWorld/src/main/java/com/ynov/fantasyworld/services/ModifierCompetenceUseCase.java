package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.CaracteristiqueMin;
import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ModifierCompetenceUseCase {

    private final CompetenceRepository repository;

    public ModifierCompetenceUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public CompetenceResponseDto executer(UUID id, CompetenceRequestDto dto) {
        Competence existante = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compétence non trouvée : " + id));

        List<UUID> prerequisIds = dto.competencesRequises() != null
                ? dto.competencesRequises() : new ArrayList<>();

        CaracteristiqueMin caracMin = null;
        if (dto.caracteristiqueMin() != null) {
            caracMin = new CaracteristiqueMin(
                    dto.caracteristiqueMin().caracteristique(),
                    dto.caracteristiqueMin().valeur()
            );
        }

        existante.setNom(dto.nom());
        existante.setDescription(dto.description());
        existante.setClasseRequise(dto.classeRequise());
        existante.setNiveauMinimum(dto.niveauMinimum());
        existante.setCaracteristiqueMin(caracMin);
        existante.setCompetencesRequises(prerequisIds);

        Competence saved = repository.save(existante);

        List<CompetenceResumeeDto> prerequisResolus = repository
                .findAllByIds(saved.getCompetencesRequises())
                .stream()
                .map(p -> new CompetenceResumeeDto(p.getId(), p.getNom()))
                .collect(Collectors.toList());

        return CompetenceResponseDto.from(saved, prerequisResolus);
    }
}