package com.ynov.fantasyworld.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable
public record CaracteristiqueMin(
    @Enumerated(EnumType.STRING)
    TypeCaracteristique caracteristique, 
    int valeur
) {}