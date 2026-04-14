package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.AventurierRepository;
import com.ynov.fantasyworld.infra.controller.dto.AventurierResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class ObtenirAventurierUseCase {

    private final AventurierRepository repository;

    public ObtenirAventurierUseCase(AventurierRepository repository) {
        this.repository = repository;
    }

    public AventurierResponseDto executer(UUID id) {
        return repository.findById(id)
                .map(AventurierResponseDto::from)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Aventurier non trouvé avec l'id : " + id
                ));
    }
}