package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResponseDto;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ObtenirCompetenceUseCase {

    private final CompetenceRepository repository;

    public ObtenirCompetenceUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public CompetenceResponseDto executer(UUID id) {
        Competence competence = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compétence non trouvée : " + id));
        return CompetenceResponseDto.from(competence);
    }
}