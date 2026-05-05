package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.Classe;
import com.ynov.fantasyworld.domain.Competence;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "aventuriers",
        indexes = {@Index(name = "idx_aventurier_nom", columnList = "nom")})
public class AventurierEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 120)
    private String nom;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private int physique;

    @Column(nullable = false)
    private int mental;

    @Column(nullable = false)
    private int perception;

    @Column(nullable = false)
    private int niveau;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Classe classe;

    @ManyToMany
    @JoinTable(
            name = "aventurier_competences",
            joinColumns = @JoinColumn(name = "aventurier_id"),
            inverseJoinColumns = @JoinColumn(name = "competence_id")
    )
    private Set<Competence> competences = new HashSet<>();

    // Constructeur vide obligatoire pour JPA
    protected AventurierEntity() {}

    // Getters
    public UUID getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public int getPhysique() { return physique; }
    public int getMental() { return mental; }
    public int getPerception() { return perception; }
    public int getNiveau() { return niveau; }
    public Classe getClasse() { return classe; }
    public Set<Competence> getCompetences() { return competences; }

    // Setters
    public void setId(UUID id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
    public void setPhysique(int physique) { this.physique = physique; }
    public void setMental(int mental) { this.mental = mental; }
    public void setPerception(int perception) { this.perception = perception; }
    public void setNiveau(int niveau) { this.niveau = niveau; }
    public void setClasse(Classe classe) { this.classe = classe; }
    public void setCompetences(Set<Competence> competences) { this.competences = competences == null ? new HashSet<>() : competences; }

    public void addCompetence(Competence competence) { this.competences.add(competence); }
    public void removeCompetence(Competence competence) { this.competences.remove(competence); }
}