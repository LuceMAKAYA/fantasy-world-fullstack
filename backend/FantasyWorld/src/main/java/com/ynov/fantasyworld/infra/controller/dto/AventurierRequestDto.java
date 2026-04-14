package com.ynov.fantasyworld.infra.controller.dto;

import com.ynov.fantasyworld.domain.Classe;
import jakarta.validation.constraints.*;

public record AventurierRequestDto(

        @NotBlank(message = "Le nom est obligatoire")
        @Size(max = 120, message = "Le nom ne peut pas dépasser 120 caractères")
        String nom,

        @Size(max = 500, message = "La description ne peut pas dépasser 500 caractères")
        String description,

        @Min(value = 1, message = "Le physique doit être au moins 1")
        @Max(value = 20, message = "Le physique ne peut pas dépasser 20")
        int physique,

        @Min(value = 1, message = "Le mental doit être au moins 1")
        @Max(value = 20, message = "Le mental ne peut pas dépasser 20")
        int mental,

        @Min(value = 1, message = "La perception doit être au moins 1")
        @Max(value = 20, message = "La perception ne peut pas dépasser 20")
        int perception,

        @NotNull(message = "La classe est obligatoire")
        Classe classe
) {}