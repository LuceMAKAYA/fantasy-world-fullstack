package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.Caracteristique;
import com.ynov.fantasyworld.domain.Classe;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "competences")
public class CompetenceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 100)
    private String nom;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private Classe classeRequise;

    @Column
    private Integer niveauMinimum;

    // CaracteristiqueMin embarquée
    @Enumerated(EnumType.STRING)
    @Column(name = "carac_type", length = 20)
    private Caracteristique caracType;

    @Column(name = "carac_valeur")
    private Integer caracValeur;

    // UUIDs des compétences requises stockés en liste
    @ElementCollection
    @CollectionTable(name = "competence_prerequis",
            joinColumns = @JoinColumn(name = "competence_id"))
    @Column(name = "requis_id")
    private List<UUID> competencesRequises = new ArrayList<>();

    protected CompetenceEntity() {}

    // Getters
    public UUID getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public Classe getClasseRequise() { return classeRequise; }
    public Integer getNiveauMinimum() { return niveauMinimum; }
    public Caracteristique getCaracType() { return caracType; }
    public Integer getCaracValeur() { return caracValeur; }
    public List<UUID> getCompetencesRequises() { return competencesRequises; }

    // Setters
    public void setId(UUID id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
    public void setClasseRequise(Classe classeRequise) { this.classeRequise = classeRequise; }
    public void setNiveauMinimum(Integer niveauMinimum) { this.niveauMinimum = niveauMinimum; }
    public void setCaracType(Caracteristique caracType) { this.caracType = caracType; }
    public void setCaracValeur(Integer caracValeur) { this.caracValeur = caracValeur; }
    public void setCompetencesRequises(List<UUID> competencesRequises) { this.competencesRequises = competencesRequises; }

}
