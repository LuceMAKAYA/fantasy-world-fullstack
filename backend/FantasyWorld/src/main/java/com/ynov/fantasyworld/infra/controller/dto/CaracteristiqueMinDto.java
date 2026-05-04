package com.ynov.fantasyworld.infra.controller.dto;


import com.ynov.fantasyworld.domain.Caracteristique;

public record CaracteristiqueMinDto(
        Caracteristique caracteristique,
        int valeur
) {}