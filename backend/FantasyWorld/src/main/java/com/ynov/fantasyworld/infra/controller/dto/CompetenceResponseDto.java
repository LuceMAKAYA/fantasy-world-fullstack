package com.ynov.fantasyworld.infra.controller.dto;

import com.ynov.fantasyworld.domain.Caracteristique;
import com.ynov.fantasyworld.domain.Classe;
import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;

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
    public static CompetenceResponseDto from(Competence competence,
                                             List<CompetenceResumeeDto> prerequisResolus) {
        CaracteristiqueMinDto caracDto = null;
        if (competence.getCaracteristiqueMin() != null) {
            caracDto = new CaracteristiqueMinDto(
                    competence.getCaracteristiqueMin().getCaracteristique(),
                    competence.getCaracteristiqueMin().getValeur()
            );
        }
        return new CompetenceResponseDto(
                competence.getId(),
                competence.getNom(),
                competence.getDescription(),
                competence.getClasseRequise(),
                competence.getNiveauMinimum(),
                caracDto,
                prerequisResolus
        );
    }
}