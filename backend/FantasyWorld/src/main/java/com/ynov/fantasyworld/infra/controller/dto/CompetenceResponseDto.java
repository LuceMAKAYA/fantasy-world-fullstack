package com.ynov.fantasyworld.infra.controller.dto;

import com.ynov.fantasyworld.domain.Classe;
import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.TypeCaracteristique;

import java.util.List;
import java.util.UUID;

public record CompetenceResponseDto(
    UUID id,
    String nom,
    String description,

    Classe classeRequise,
    Integer niveauMinimum,
    CaracteristiqueMinDto caracteristiqueMin,
    List<CompetenceResumeeDto> competencesRequises
) {
    public record CaracteristiqueMinDto(TypeCaracteristique caracteristique, int valeur) {}
    public record CompetenceResumeeDto(UUID id, String nom) {}

    // Méthode statique pour transformer facilement ton objet Domaine en DTO
    public static CompetenceResponseDto from(Competence competence) {
        CaracteristiqueMinDto caracDto = null;
        if (competence.getCaracteristiqueMin() != null) {
            caracDto = new CaracteristiqueMinDto(
                    competence.getCaracteristiqueMin().caracteristique(),
                    competence.getCaracteristiqueMin().valeur()
            );
        }

        List<CompetenceResumeeDto> prerequisDtos = competence.getCompetencesRequises() == null
                ? List.of()
                : competence.getCompetencesRequises().stream()
                .map(c -> new CompetenceResumeeDto(c.getId(), c.getNom()))
                .toList();

        return new CompetenceResponseDto(
                competence.getId(),
                competence.getNom(),
                competence.getDescription(),
                competence.getClasseRequise(),
                competence.getNiveauMinimum(),
                caracDto,
                prerequisDtos
        );
    }

}