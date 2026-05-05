package com.ynov.fantasyworld.infra.controller.dto;

import com.ynov.fantasyworld.domain.Competence;
import java.util.UUID;

public record CompetenceResumeeDto(UUID id, String nom) {
    public static CompetenceResumeeDto from(Competence competence) {
        return new CompetenceResumeeDto(competence.getId(), competence.getNom());
    }
}
