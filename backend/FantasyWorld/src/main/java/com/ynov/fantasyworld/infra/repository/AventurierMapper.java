package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.Aventurier;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class AventurierMapper {

    private final CompetenceJpaRepository competenceJpaRepository;

    public AventurierMapper(CompetenceJpaRepository competenceJpaRepository) {
        this.competenceJpaRepository = competenceJpaRepository;
    }

    // Convertit une entité JPA → domaine métier
    public Aventurier toDomain(AventurierEntity entity) {
        Aventurier aventurier = new Aventurier(
                entity.getNom(),
                entity.getDescription(),
                entity.getPhysique(),
                entity.getMental(),
                entity.getPerception(),
                entity.getClasse()
        );

        // On set le niveau manuellement car le constructeur force niveau=1
        aventurier.setId(entity.getId());

        // On monte de niveau autant de fois que nécessaire
        for (int i = 1; i < entity.getNiveau(); i++) {
            aventurier.monterDeNiveau();
        }

        if (entity.getCompetences() != null && !entity.getCompetences().isEmpty()) {
            Set<UUID> competenceIds = entity.getCompetences()
                    .stream()
                    .map(CompetenceEntity::getId)
                    .collect(Collectors.toSet());

            aventurier.setCompetencesAcquises(competenceIds);
        }

        return aventurier;
    }

    // Convertit un domaine métier → entité JPA
    public AventurierEntity toEntity(Aventurier aventurier) {
        AventurierEntity entity = new AventurierEntity();

        // On ne set pas l'id si null → JPA le génère
        if (aventurier.getId() != null) {
            entity.setId(aventurier.getId());
        }

        entity.setNom(aventurier.getNom());
        entity.setDescription(aventurier.getDescription());
        entity.setPhysique(aventurier.getPhysique());
        entity.setMental(aventurier.getMental());
        entity.setPerception(aventurier.getPerception());
        entity.setNiveau(aventurier.getNiveau());
        entity.setClasse(aventurier.getClasse());

        if (aventurier.getCompetencesAcquises() != null && !aventurier.getCompetencesAcquises().isEmpty()) {
            List<CompetenceEntity> competences = competenceJpaRepository.findAllById(
                    aventurier.getCompetencesAcquises()
            );

            if (competences.size() != aventurier.getCompetencesAcquises().size()) {
                throw new IllegalArgumentException("Une ou plusieurs compétences acquises sont introuvables");
            }

            entity.setCompetences(new HashSet<>(competences));
        } else {
            entity.setCompetences(new HashSet<>());
        }

        return entity;
    }
}