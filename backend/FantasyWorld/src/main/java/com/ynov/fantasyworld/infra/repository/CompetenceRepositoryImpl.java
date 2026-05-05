package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.Competence;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class CompetenceRepositoryImpl implements CompetenceRepository {

    private final CompetenceJpaRepository jpaRepository;
    private final CompetenceMapper mapper;

    public CompetenceRepositoryImpl(CompetenceJpaRepository jpaRepository,
                                    CompetenceMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Competence save(Competence competence) {
        // Charge les entités prérequis
        List<CompetenceEntity> prerequisEntities = competence.getCompetencesRequises() == null
                ? List.of()
                : competence.getCompetencesRequises().stream()
                .map(c -> jpaRepository.findById(c.getId()).orElseThrow())
                .toList();

        CompetenceEntity entity = mapper.toEntity(competence, prerequisEntities);
        CompetenceEntity saved = jpaRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Competence> findById(UUID id) {
        return jpaRepository.findById(id).map(mapper::toDomain);
    }

    @Override
    public Page<Competence> findAll(PageRequest pageRequest) {
        return jpaRepository.findAll(pageRequest).map(mapper::toDomain);
    }

    @Override
    public List<Competence> findAllById(List<UUID> ids) {
        return jpaRepository.findAllById(ids).stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(UUID id) {
        return jpaRepository.existsById(id);
    }
}