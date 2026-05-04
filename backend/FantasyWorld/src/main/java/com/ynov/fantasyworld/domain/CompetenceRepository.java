package com.ynov.fantasyworld.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface CompetenceRepository extends JpaRepository<Competence, UUID> {
    // Cette interface hérite de toutes les méthodes de base :
    // .save() -> utilisé dans ton Use Case
    // .findAllById() -> utilisé pour charger les prérequis
    // .findById() -> pour chercher une compétence précise
}