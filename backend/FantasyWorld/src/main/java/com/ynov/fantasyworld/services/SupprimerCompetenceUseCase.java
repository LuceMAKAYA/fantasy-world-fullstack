package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.CompetenceRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class SupprimerCompetenceUseCase {
    private final CompetenceRepository competenceRepository;

    public SupprimerCompetenceUseCase(CompetenceRepository competenceRepository) {
        this.competenceRepository = competenceRepository;
    }

    public void execute(UUID id) {
        competenceRepository.deleteById(id);
    }
}