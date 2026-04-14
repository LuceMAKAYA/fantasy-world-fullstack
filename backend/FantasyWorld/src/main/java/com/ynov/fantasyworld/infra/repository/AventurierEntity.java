package com.ynov.fantasyworld.infra.repository;

import com.ynov.fantasyworld.domain.Classe;
import jakarta.persistence.*;
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

    // Setters
    public void setId(UUID id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setDescription(String description) { this.description = description; }
    public void setPhysique(int physique) { this.physique = physique; }
    public void setMental(int mental) { this.mental = mental; }
    public void setPerception(int perception) { this.perception = perception; }
    public void setNiveau(int niveau) { this.niveau = niveau; }
    public void setClasse(Classe classe) { this.classe = classe; }
}