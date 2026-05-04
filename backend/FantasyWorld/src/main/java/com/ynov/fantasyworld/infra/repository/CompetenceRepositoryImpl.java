package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.Competence;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import com.ynov.fantasyworld.domain.CompetenceRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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
            CompetenceEntity entity = mapper.toEntity(competence);
            return mapper.toDomain(jpaRepository.save(entity));
        }

        @Override
        public Optional<Competence> findById(UUID id) {
            return jpaRepository.findById(id).map(mapper::toDomain);
        }

        @Override
        public List<Competence> findAll(int page, int size) {
            return jpaRepository.findAll(PageRequest.of(page, size))
                    .stream().map(mapper::toDomain).collect(Collectors.toList());
        }

        @Override
        public long count() { return jpaRepository.count(); }

        @Override
        public boolean existsById(UUID id) { return jpaRepository.existsById(id); }

        @Override
        public boolean existsByNom(String nom) { return jpaRepository.existsByNom(nom); }

        @Override
        public void deleteById(UUID id) { jpaRepository.deleteById(id); }

        @Override
        public List<Competence> findAllByIds(List<UUID> ids) {
            return jpaRepository.findAllByIdIn(ids)
                    .stream().map(mapper::toDomain).collect(Collectors.toList());
        }
}
