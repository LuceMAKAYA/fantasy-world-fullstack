package com.ynov.fantasyworld.infra.controller.dto;
import com.ynov.fantasyworld.domain.Caracteristique;
import com.ynov.fantasyworld.domain.Classe;
import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
public record CompetenceRequestDto(

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100)
    String nom,

    @Size(max = 500)
    String description,

    Classe classeRequise,

    @Min(1)
    Integer niveauMinimum,

    CaracteristiqueMinDto caracteristiqueMin,

    List<UUID> competencesRequises
) {}

