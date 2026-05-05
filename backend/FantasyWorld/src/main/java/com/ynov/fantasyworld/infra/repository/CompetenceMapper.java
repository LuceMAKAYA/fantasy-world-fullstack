package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.Competence;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CompetenceMapper {

    public Competence toDomain(CompetenceEntity entity) {
        List<Competence> prerequisDomain = entity.getCompetencesRequises() == null
                ? new ArrayList<>()
                : entity.getCompetencesRequises().stream()
                .map(this::toDomain)
                .toList();

        Competence competence = new Competence(
                entity.getNom(),
                entity.getDescription(),
                entity.getClasseRequise(),
                entity.getNiveauMinimum(),
                entity.getCaracteristiqueMin(),
                prerequisDomain
        );
        competence.setId(entity.getId());
        return competence;
    }

    public CompetenceEntity toEntity(Competence competence, List<CompetenceEntity> prerequisEntities) {
        CompetenceEntity entity = new CompetenceEntity(
                competence.getNom(),
                competence.getDescription(),
                competence.getClasseRequise(),
                competence.getNiveauMinimum(),
                competence.getCaracteristiqueMin(),
                prerequisEntities
        );
        if (competence.getId() != null) {
            entity.setId(competence.getId()); // besoin d'un setter id
        }
        return entity;
    }
}