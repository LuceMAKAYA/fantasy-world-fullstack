package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.domain.Aventurier;
import com.ynov.fantasyworld.domain.AventurierRepository;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import com.ynov.fantasyworld.infra.controller.dto.AjouterCompetenceRequestDto;
import com.ynov.fantasyworld.infra.controller.dto.AventurierResponseDto;
import com.ynov.fantasyworld.infra.controller.dto.CompetenceResumeeDto;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AjouterCompetenceAventurierUseCase {

    private final AventurierRepository aventurierRepository;
    private final CompetenceRepository competenceRepository;

    public AjouterCompetenceAventurierUseCase(
            AventurierRepository aventurierRepository,
            CompetenceRepository competenceRepository) {
        this.aventurierRepository = aventurierRepository;
        this.competenceRepository = competenceRepository;
    }

    public AventurierResponseDto executer(UUID id, AjouterCompetenceRequestDto dto) {
        var competence = competenceRepository.findById(dto.competenceId())
                .orElseThrow(() -> new IllegalArgumentException("Compétence non trouvée : " + dto.competenceId()));

        var aventurier = aventurierRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aventurier non trouvé : " + id));

        aventurier.ajouterCompetence(dto.competenceId());
        var saved = aventurierRepository.save(aventurier);

        List<CompetenceResumeeDto> competences = saved.getCompetencesAcquises().stream()
                .map(competenceRepository::findById)
                .flatMap(opt -> opt.stream())
                .map(CompetenceResumeeDto::from)
                .collect(Collectors.toList());

        return AventurierResponseDto.from(saved, competences);
    }
}
