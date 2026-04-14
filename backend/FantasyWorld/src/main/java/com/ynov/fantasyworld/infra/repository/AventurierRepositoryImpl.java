package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.Aventurier;
import com.ynov.fantasyworld.domain.AventurierRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class AventurierRepositoryImpl implements AventurierRepository {

    private final AventurierJpaRepository jpaRepository;
    private final AventurierMapper mapper;

    public AventurierRepositoryImpl(AventurierJpaRepository jpaRepository,
                                    AventurierMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Aventurier save(Aventurier aventurier) {
        AventurierEntity entity = mapper.toEntity(aventurier);
        AventurierEntity saved = jpaRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public List<Aventurier> findAll(int page, int size) {
        return jpaRepository.findAll(PageRequest.of(page, size))
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public long count() {
        return jpaRepository.count();
    }

    @Override
    public Optional<Aventurier> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomain);
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