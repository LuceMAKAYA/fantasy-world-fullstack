package com.ynov.fantasyworld.infra.controller.dto;

import com.ynov.fantasyworld.domain.Competence;
import java.util.UUID;

public record CompetenceResponseDto(
    UUID id,
    String nom,
    String description
) {
    // Méthode statique pour transformer facilement ton objet Domaine en DTO
    public static CompetenceResponseDto from(Competence competence) {
        return new CompetenceResponseDto(
            competence.getId(),
            competence.getNom(),
            competence.getDescription()
        );
    }
}