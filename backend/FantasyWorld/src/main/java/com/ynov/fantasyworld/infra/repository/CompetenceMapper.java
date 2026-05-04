package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.CaracteristiqueMin;
import com.ynov.fantasyworld.domain.Competence;
import org.springframework.stereotype.Component;

@Component
public class CompetenceMapper {
    public Competence toDomain(CompetenceEntity entity) {
        CaracteristiqueMin caracMin = null;
        if (entity.getCaracType() != null && entity.getCaracValeur() != null) {
            caracMin = new CaracteristiqueMin(entity.getCaracType(), entity.getCaracValeur());
        }
        Competence competence = new Competence(
                entity.getNom(),
                entity.getDescription(),
                entity.getClasseRequise(),
                entity.getNiveauMinimum(),
                caracMin,
                entity.getCompetencesRequises()
        );
        competence.setId(entity.getId());
        return competence;
    }

    public CompetenceEntity toEntity(Competence competence) {
        CompetenceEntity entity = new CompetenceEntity();
        if (competence.getId() != null) entity.setId(competence.getId());
        entity.setNom(competence.getNom());
        entity.setDescription(competence.getDescription());
        entity.setClasseRequise(competence.getClasseRequise());
        entity.setNiveauMinimum(competence.getNiveauMinimum());
        if (competence.getCaracteristiqueMin() != null) {
            entity.setCaracType(competence.getCaracteristiqueMin().getCaracteristique());
            entity.setCaracValeur(competence.getCaracteristiqueMin().getValeur());
        }
        entity.setCompetencesRequises(competence.getCompetencesRequises());
        return entity;
    }
}
