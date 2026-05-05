package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResponseDto;
import com.ynov.fantasyworld.infra.controller.dto.PageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ListerCompetencesUseCase {

    private final CompetenceRepository repository;

    public ListerCompetencesUseCase(CompetenceRepository repository) {
        this.repository = repository;
    }

    public PageResponseDto<CompetenceResponseDto> executer(int page, int size) {
        Page<com.ynov.fantasyworld.domain.Competence> result =
                repository.findAll(PageRequest.of(page, size));

        return new PageResponseDto<>(
                result.getContent().stream()
                        .map(CompetenceResponseDto::from)
                        .toList(),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages()
        );
    }
}