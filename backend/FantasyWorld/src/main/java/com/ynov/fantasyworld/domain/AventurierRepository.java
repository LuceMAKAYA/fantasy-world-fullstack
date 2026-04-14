package com.ynov.fantasyworld.domain;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AventurierRepository {

    Aventurier save(Aventurier aventurier);

    // Ajout de la pagination
    List<Aventurier> findAll(int page, int size);

    // Pour la pagination on a besoin du total
    long count();

    Optional<Aventurier> findById(UUID id);

    void deleteById(UUID id);

    boolean existsById(UUID id);
}