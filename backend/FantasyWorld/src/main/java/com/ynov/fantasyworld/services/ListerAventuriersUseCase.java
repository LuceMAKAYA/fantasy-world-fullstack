package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.AventurierRepository;
import com.ynov.fantasyworld.infra.controller.dto.AventurierResponseDto;
import com.ynov.fantasyworld.infra.controller.dto.PageResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListerAventuriersUseCase {

    private final AventurierRepository repository;

    public ListerAventuriersUseCase(AventurierRepository repository) {
        this.repository = repository;
    }

    public PageResponseDto<AventurierResponseDto> executer(int page, int size) {
        List<AventurierResponseDto> content = repository.findAll(page, size)
                .stream()
                .map(AventurierResponseDto::from)
                .collect(Collectors.toList());

        long totalElements = repository.count();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        return new PageResponseDto<>(
                content,
                page,
                size,
                totalElements,
                totalPages
        );
    }
}