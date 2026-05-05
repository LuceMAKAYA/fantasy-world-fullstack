package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.CaracteristiqueMin;
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

    @Column(nullable = false)
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
    private List<CompetenceEntity> competencesRequises = new ArrayList<>();

    protected CompetenceEntity() {}

    public CompetenceEntity(String nom, String description, Classe classeRequise,
                            Integer niveauMinimum, CaracteristiqueMin caracteristiqueMin,
                            List<CompetenceEntity> competencesRequises) {
        this.nom = nom;
        this.description = description;
        this.classeRequise = classeRequise;
        this.niveauMinimum = niveauMinimum;
        this.caracteristiqueMin = caracteristiqueMin;
        this.competencesRequises = competencesRequises != null ? competencesRequises : new ArrayList<>();
    }

    public UUID getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public Classe getClasseRequise() { return classeRequise; }
    public Integer getNiveauMinimum() { return niveauMinimum; }
    public CaracteristiqueMin getCaracteristiqueMin() { return caracteristiqueMin; }
    public List<CompetenceEntity> getCompetencesRequises() { return competencesRequises; }

    public void setId(UUID id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
    public void setClasseRequise(Classe classeRequise) { this.classeRequise = classeRequise; }
    public void setNiveauMinimum(Integer niveauMinimum) { this.niveauMinimum = niveauMinimum; }
    public void setCaracteristiqueMin(CaracteristiqueMin caracteristiqueMin) { this.caracteristiqueMin = caracteristiqueMin; }
    public void setCompetencesRequises(List<CompetenceEntity> competencesRequises) { this.competencesRequises = competencesRequises; }
}