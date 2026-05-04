package com.ynov.fantasyworld.domain;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CompetenceRepository {
    Competence save(Competence competence);
    Optional<Competence> findById(UUID id);
    List<Competence> findAll(int page, int size);
    long count();
    boolean existsById(UUID id);
    boolean existsByNom(String nom);
    void deleteById(UUID id);
    List<Competence> findAllByIds(List<UUID> ids);
}
