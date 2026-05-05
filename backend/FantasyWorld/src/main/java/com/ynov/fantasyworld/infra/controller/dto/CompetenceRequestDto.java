package com.ynov.fantasyworld.infra.controller.dto;

import com.ynov.fantasyworld.domain.Classe;
import com.ynov.fantasyworld.domain.CaracteristiqueMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

public record CompetenceRequestDto(
    @NotBlank 
    String nom,
    
    String description,
    
    @NotNull
    Classe classeRequise,
    
    @NotNull
    Integer niveauMinimum,
    
    @NotNull
    CaracteristiqueMin caracteristiqueMin,
    
    List<UUID> competencesRequises // Liste d'IDs pour l'arbre de compétences
) {}