package com.ynov.fantasyworld.infra.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface AppLogRepository
        extends MongoRepository<AppLogDocument, String> {

    List<AppLogDocument> findByLevel(String level);

    List<AppLogDocument> findByTimestampBetween(
            Instant from, Instant to);
}