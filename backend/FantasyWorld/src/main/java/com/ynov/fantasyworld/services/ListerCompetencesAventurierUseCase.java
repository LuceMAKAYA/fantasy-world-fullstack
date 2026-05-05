package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.AventurierRepository;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResumeeDto;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ListerCompetencesAventurierUseCase {

    private final AventurierRepository aventurierRepository;
    private final CompetenceRepository competenceRepository;

    public ListerCompetencesAventurierUseCase(
            AventurierRepository aventurierRepository,
            CompetenceRepository competenceRepository) {
        this.aventurierRepository = aventurierRepository;
        this.competenceRepository = competenceRepository;
    }

    public List<CompetenceResumeeDto> executer(UUID id) {
        var aventurier = aventurierRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aventurier non trouvé : " + id));

        return aventurier.getCompetencesAcquises().stream()
                .map(competenceRepository::findById)
                .flatMap(opt -> opt.stream())
                .map(CompetenceResumeeDto::from)
                .collect(Collectors.toList());
    }
}
