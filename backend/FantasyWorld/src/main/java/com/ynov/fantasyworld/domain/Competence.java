package com.ynov.fantasyworld.domain;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Competence {

    private UUID id;
    private String nom;
    private String description;

    // Prérequis — tous optionnels
    private Classe classeRequise;
    private Integer niveauMinimum;
    private CaracteristiqueMin caracteristiqueMin;
    private List<UUID> competencesRequises = new ArrayList<>();

    public Competence(String nom, String description,
                      Classe classeRequise, Integer niveauMinimum,
                      CaracteristiqueMin caracteristiqueMin,
                      List<UUID> competencesRequises) {
        if (nom == null || nom.isBlank()) {
            throw new IllegalArgumentException("Le nom ne peut pas être vide");
        }
        this.nom = nom;
        this.description = description;
        this.classeRequise = classeRequise;
        this.niveauMinimum = niveauMinimum;
        this.caracteristiqueMin = caracteristiqueMin;
        this.competencesRequises = competencesRequises != null ? competencesRequises : new ArrayList<>();
    }

    // Getters
    public UUID getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public Classe getClasseRequise() { return classeRequise; }
    public Integer getNiveauMinimum() { return niveauMinimum; }
    public CaracteristiqueMin getCaracteristiqueMin() { return caracteristiqueMin; }
    public List<UUID> getCompetencesRequises() { return competencesRequises; }

    // Setters
    public void setId(UUID id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
    public void setClasseRequise(Classe classeRequise) { this.classeRequise = classeRequise; }
    public void setNiveauMinimum(Integer niveauMinimum) { this.niveauMinimum = niveauMinimum; }
    public void setCaracteristiqueMin(CaracteristiqueMin caracteristiqueMin) { this.caracteristiqueMin = caracteristiqueMin; }
    public void setCompetencesRequises(List<UUID> competencesRequises) { this.competencesRequises = competencesRequises; }
}
