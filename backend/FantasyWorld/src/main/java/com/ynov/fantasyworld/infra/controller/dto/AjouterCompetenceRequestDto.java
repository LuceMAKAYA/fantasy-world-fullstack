package com.ynov.fantasyworld.infra.controller.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record AjouterCompetenceRequestDto(
        @NotNull(message = "L'ID de la compétence est obligatoire")
        UUID competenceId
) {}
