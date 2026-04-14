package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.AventurierRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
public class SupprimerAventurierUseCase {

    private final AventurierRepository repository;

    public SupprimerAventurierUseCase(AventurierRepository repository) {
        this.repository = repository;
    }

    public void executer(UUID id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Aventurier non trouvé avec l'id : " + id
            );
        }
        repository.deleteById(id);
    }
}