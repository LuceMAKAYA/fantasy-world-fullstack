package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListerCompetencesUseCase {

    private final CompetenceRepository repository;

    public ListerCompetencesUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public PageResponseDto<CompetenceResponseDto> executer(int page, int size) {
        List<Competence> competences = repository.findAll(page, size);
        long total = repository.count();
        int totalPages = (int) Math.ceil((double) total / size);

        List<CompetenceResponseDto> content = competences.stream()
                .map(c -> {
                    List<CompetenceResumeeDto> prerequis = repository
                            .findAllByIds(c.getCompetencesRequises())
                            .stream()
                            .map(p -> new CompetenceResumeeDto(p.getId(), p.getNom()))
                            .collect(Collectors.toList());
                    return CompetenceResponseDto.from(c, prerequis);
                })
                .collect(Collectors.toList());

        return new PageResponseDto<>(content, page, size, total, totalPages);
    }
}