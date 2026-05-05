package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreerCompetenceUseCase {

    private final CompetenceRepository repository;

    public CreerCompetenceUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public CompetenceResponseDto executer(CompetenceRequestDto dto) {
        // 1. On récupère les objets Competence correspondant aux IDs de prérequis
        List<Competence> prerequis = List.of();
        if (dto.competencesRequises() != null && !dto.competencesRequises().isEmpty()) {
            prerequis = repository.findAllById(dto.competencesRequises());
        }

        // 2. On instancie l'objet de domaine Competence
        Competence competence = new Competence(
                dto.nom(),
                dto.description(),
                dto.classeRequise(),
                dto.niveauMinimum(),
                dto.caracteristiqueMin(),
                prerequis
        );

        // 3. Sauvegarde en base de données
        Competence saved = repository.save(competence);

        // 4. On retourne le DTO de réponse (id, nom, description)
        return CompetenceResponseDto.from(saved);
    }
}