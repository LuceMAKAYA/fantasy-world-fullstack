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
public class CreerCompetenceUseCase {

    private final CompetenceRepository repository;

    public CreerCompetenceUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public CompetenceResponseDto executer(CompetenceRequestDto dto) {
        // Vérifie que les compétences requises existent
        List<UUID> prerequisIds = dto.competencesRequises() != null
                ? dto.competencesRequises() : new ArrayList<>();

        if (!prerequisIds.isEmpty()) {
            List<UUID> trouvees = repository.findAllByIds(prerequisIds)
                    .stream().map(c -> c.getId()).collect(Collectors.toList());
            prerequisIds.forEach(id -> {
                if (!trouvees.contains(id)) {
                    throw new RuntimeException("Compétence requise introuvable : " + id);
                }
            });
        }

        CaracteristiqueMin caracMin = null;
        if (dto.caracteristiqueMin() != null) {
            caracMin = new CaracteristiqueMin(
                    dto.caracteristiqueMin().caracteristique(),
                    dto.caracteristiqueMin().valeur()
            );
        }

        Competence competence = new Competence(
                dto.nom(), dto.description(), dto.classeRequise(),
                dto.niveauMinimum(), caracMin, prerequisIds
        );

        Competence saved = repository.save(competence);

        List<CompetenceResumeeDto> prerequisResolus = repository
                .findAllByIds(saved.getCompetencesRequises())
                .stream()
                .map(p -> new CompetenceResumeeDto(p.getId(), p.getNom()))
                .collect(Collectors.toList());

        return CompetenceResponseDto.from(saved, prerequisResolus);
    }
}