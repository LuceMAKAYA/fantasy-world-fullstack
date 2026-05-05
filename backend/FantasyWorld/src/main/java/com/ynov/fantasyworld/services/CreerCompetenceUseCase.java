package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResponseDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CreerCompetenceUseCase {

    private final CompetenceRepository repository;

    public CreerCompetenceUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public CompetenceResponseDto executer(CompetenceRequestDto dto) {
        List<Competence> prerequis = new ArrayList<>();
        if (dto.competencesRequises() != null && !dto.competencesRequises().isEmpty()) {
            prerequis = new ArrayList<>(repository.findAllById(dto.competencesRequises()));
        }

        Competence competence = new Competence(
                dto.nom(),
                dto.description(),
                dto.classeRequise(),
                dto.niveauMinimum(),
                dto.caracteristiqueMin(),
                prerequis
        );

        Competence saved = repository.save(competence);
        return CompetenceResponseDto.from(saved);
    }
}