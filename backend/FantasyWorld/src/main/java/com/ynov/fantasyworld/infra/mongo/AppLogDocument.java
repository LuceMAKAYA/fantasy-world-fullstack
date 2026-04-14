package com.ynov.fantasyworld.infra.mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

@Document("app_logs")
public class AppLogDocument {

    @Id
    private String id;

    private Instant timestamp;

    @Indexed
    private String level;

    private String message;

    private Map<String, Object> payload;

    // Constructeur vide
    public AppLogDocument() {}

    // Constructeur complet
    public AppLogDocument(String level, String message,
                          Map<String, Object> payload) {
        this.timestamp = Instant.now();
        this.level = level;
        this.message = message;
        this.payload = payload;
    }

    // Getters
    public String getId() { return id; }
    public Instant getTimestamp() { return timestamp; }
    public String getLevel() { return level; }
    public String getMessage() { return message; }
    public Map<String, Object> getPayload() { return payload; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public void setLevel(String level) { this.level = level; }
    public void setMessage(String message) { this.message = message; }
    public void setPayload(Map<String, Object> payload) { this.payload = payload; }
}