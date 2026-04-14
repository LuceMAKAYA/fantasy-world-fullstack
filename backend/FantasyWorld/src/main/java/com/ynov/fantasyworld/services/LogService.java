package com.ynov.fantasyworld.services;

import com.ynov.fantasyworld.infra.mongo.AppLogDocument;
import com.ynov.fantasyworld.infra.mongo.AppLogRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LogService {

    private final AppLogRepository logRepository;

    public LogService(AppLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    // Log INFO — succès
    public void info(String message, Map<String, Object> payload) {
        AppLogDocument log = new AppLogDocument("INFO", message, payload);
        logRepository.save(log);
    }

    // Log WARN — erreur client (4xx)
    public void warn(String message, Map<String, Object> payload) {
        AppLogDocument log = new AppLogDocument("WARN", message, payload);
        logRepository.save(log);
    }

    // Log ERROR — erreur serveur (5xx)
    public void error(String message, Map<String, Object> payload) {
        AppLogDocument log = new AppLogDocument("ERROR", message, payload);
        logRepository.save(log);
    }
}