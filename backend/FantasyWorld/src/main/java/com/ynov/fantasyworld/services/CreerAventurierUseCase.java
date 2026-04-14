package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Aventurier;
import com.ynov.fantasyworld.domain.AventurierRepository;
import com.ynov.fantasyworld.infra.controller.dto.AventurierRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.AventurierResponseDto;
import org.springframework.stereotype.Service;

@Service
public class CreerAventurierUseCase {

    private final AventurierRepository repository;

    public CreerAventurierUseCase(AventurierRepository repository) {
        this.repository = repository;
    }

    public AventurierResponseDto executer(AventurierRequestDto dto) {
        Aventurier aventurier = new Aventurier(
                dto.nom(),
                dto.description(),
                dto.physique(),
                dto.mental(),
                dto.perception(),
                dto.classe()
        );
        Aventurier saved = repository.save(aventurier);
        return AventurierResponseDto.from(saved);
    }
}