package com.ynov.fantasyworld.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompetenceRepository {
    Competence save(Competence competence);
    Optional<Competence> findById(UUID id);
    Page<Competence> findAll(PageRequest pageRequest);
    List<Competence> findAllById(List<UUID> ids);
    void deleteById(UUID id);
    boolean existsById(UUID id);
}