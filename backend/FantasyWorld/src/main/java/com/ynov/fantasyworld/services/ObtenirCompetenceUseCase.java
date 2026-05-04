package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ObtenirCompetenceUseCase {

    private final CompetenceRepository repository;

    public ObtenirCompetenceUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public CompetenceResponseDto executer(UUID id) {
        Competence competence = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compétence non trouvée : " + id));

        List<CompetenceResumeeDto> prerequis = repository
                .findAllByIds(competence.getCompetencesRequises())
                .stream()
                .map(p -> new CompetenceResumeeDto(p.getId(), p.getNom()))
                .collect(Collectors.toList());

        return CompetenceResponseDto.from(competence, prerequis);
    }
}