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

        verifierPrerequis(competence, aventurier);

        aventurier.ajouterCompetence(dto.competenceId());
        var saved = aventurierRepository.save(aventurier);

        List<CompetenceResumeeDto> competences = saved.getCompetencesAcquises().stream()
                .map(competenceRepository::findById)
                .flatMap(opt -> opt.stream())
                .map(CompetenceResumeeDto::from)
                .collect(Collectors.toList());

        return AventurierResponseDto.from(saved, competences);
    }

    private void verifierPrerequis(com.ynov.fantasyworld.domain.Competence competence, Aventurier aventurier) {
        if (competence.getNiveauMinimum() != null && aventurier.getNiveau() < competence.getNiveauMinimum()) {
            throw new IllegalArgumentException("L'aventurier doit être au moins niveau " + competence.getNiveauMinimum());
        }

        if (competence.getClasseRequise() != null && aventurier.getClasse() != competence.getClasseRequise()) {
            throw new IllegalArgumentException("Compétence réservée à la classe " + competence.getClasseRequise());
        }

        if (competence.getCaracteristiqueMin() != null) {
            int valeurRequise = competence.getCaracteristiqueMin().valeur();
            var caracteristique = competence.getCaracteristiqueMin().caracteristique();
            int valeurAventurier;
            switch (caracteristique) {
                case PHYSIQUE -> valeurAventurier = aventurier.getPhysique();
                case MENTAL -> valeurAventurier = aventurier.getMental();
                case PERCEPTION -> valeurAventurier = aventurier.getPerception();
                default -> valeurAventurier = 0;
            }
            if (valeurAventurier < valeurRequise) {
                throw new IllegalArgumentException("La caractéristique " + caracteristique + " doit être au moins " + valeurRequise);
            }
        }

        if (competence.getCompetencesRequises() != null && !competence.getCompetencesRequises().isEmpty()) {
            var manquantes = competence.getCompetencesRequises().stream()
                    .filter(prerequis -> !aventurier.possederCompetence(prerequis.getId()))
                    .map(prerequis -> prerequis.getNom())
                    .toList();
            if (!manquantes.isEmpty()) {
                throw new IllegalArgumentException("Compétences requises manquantes : " + String.join(", ", manquantes));
            }
        }
    }
}
