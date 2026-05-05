package com.ynov.fantasyworld.domain;

import jakarta.persistence.*;
import java.util.List;
import java.util.UUID;
import java.util.ArrayList;

@Entity
@Table(name = "competences")
public class Competence {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nom;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    private Classe classeRequise; 

    private Integer niveauMinimum;

    @Embedded 
    private CaracteristiqueMin caracteristiqueMin;

    @ManyToMany
    @JoinTable(
        name = "competences_prerequises",
        joinColumns = @JoinColumn(name = "competence_id"),
        inverseJoinColumns = @JoinColumn(name = "prerequis_id")
    )
    private List<Competence> competencesRequises = new ArrayList<>();

    // Constructeur par défaut (Obligatoire pour JPA)
    public Competence() {}

    // Ton constructeur qui posait problème
    public Competence(String nom, String description, Classe classeRequise, 
                      Integer niveauMinimum, CaracteristiqueMin caracteristiqueMin, 
                      List<Competence> competencesRequises) {
        this.nom = nom;
        this.description = description;
        this.classeRequise = classeRequise;
        this.niveauMinimum = niveauMinimum;
        this.caracteristiqueMin = caracteristiqueMin;
        this.competencesRequises = competencesRequises;
    }

    // Getters indispensables pour le Use Case et le DTO
    public UUID getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public Classe getClasseRequise() { return classeRequise; }
    public Integer getNiveauMinimum() { return niveauMinimum; }
    public CaracteristiqueMin getCaracteristiqueMin() { return caracteristiqueMin; }
    public List<Competence> getCompetencesRequises() { return competencesRequises; }
}