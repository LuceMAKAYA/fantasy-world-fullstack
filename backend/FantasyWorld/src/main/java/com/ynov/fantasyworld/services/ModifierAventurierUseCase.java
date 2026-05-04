package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Aventurier;
import com.ynov.fantasyworld.domain.AventurierRepository;
import com.ynov.fantasyworld.infra.controller.dto.AventurierRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.AventurierResponseDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ModifierAventurierUseCase {

    private final AventurierRepository repository;

    public ModifierAventurierUseCase(AventurierRepository repository) {
        this.repository = repository;
    }

    public AventurierResponseDto executer(UUID id, AventurierRequestDto dto) {
        Aventurier existant = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aventurier non trouvé : " + id));

        // Le niveau ne peut pas être modifié directement (règle métier du contrat)
        existant.setNom(dto.nom());
        existant.setDescription(dto.description());
        existant.setPhysique(dto.physique());
        existant.setMental(dto.mental());
        existant.setPerception(dto.perception());
        existant.setClasse(dto.classe());

        Aventurier saved = repository.save(existant);
        return AventurierResponseDto.from(saved);
    }
}