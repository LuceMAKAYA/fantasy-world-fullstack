package com.ynov.fantasyworld.infra.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CompetenceJpaRepository extends JpaRepository<CompetenceEntity, UUID> {
    boolean existsByNom(String nom);
    List<CompetenceEntity> findAllByIdIn(List<UUID> ids);
}
