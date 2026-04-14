package com.ynov.fantasyworld.infra.controller.dto;

import com.ynov.fantasyworld.domain.Aventurier;
import com.ynov.fantasyworld.domain.Classe;
import java.util.UUID;

public record AventurierResponseDto(
        UUID id,
        String nom,
        String description,
        int physique,
        int mental,
        int perception,
        int niveau,
        Classe classe
) {
    // Méthode factory pour créer un DTO depuis le domaine
    public static AventurierResponseDto from(Aventurier aventurier) {
        return new AventurierResponseDto(
                aventurier.getId(),
                aventurier.getNom(),
                aventurier.getDescription(),
                aventurier.getPhysique(),
                aventurier.getMental(),
                aventurier.getPerception(),
                aventurier.getNiveau(),
                aventurier.getClasse()
        );
    }
}