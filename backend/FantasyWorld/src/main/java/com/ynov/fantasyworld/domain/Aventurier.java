package com.ynov.fantasyworld.domain;

import java.util.UUID;

public class Aventurier {

    private UUID id;
    private String nom;
    private String description;
    private int physique;
    private int mental;
    private int perception;
    private int niveau;
    private Classe classe;

    // Constructeur — niveau TOUJOURS 1 à la création
    public Aventurier(String nom, String description,
                      int physique, int mental, int perception,
                      Classe classe) {
        if (nom == null || nom.isBlank()) {
            throw new IllegalArgumentException("Le nom ne peut pas être vide");
        }
        this.nom = nom;
        this.description = description;
        this.physique = physique;
        this.mental = mental;
        this.perception = perception;
        this.classe = classe;
        this.niveau = 1; // règle métier
    }

    // Règle métier : monte de 1 uniquement
    public void monterDeNiveau() {
        if (this.niveau >= 100) {
            throw new IllegalStateException("Niveau maximum atteint !");
        }
        this.niveau++;
    }

    // Getters
    public UUID getId() { return id; }
    public String getNom() { return nom; }
    public String getDescription() { return description; }
    public int getPhysique() { return physique; }
    public int getMental() { return mental; }
    public int getPerception() { return perception; }
    public int getNiveau() { return niveau; }
    public Classe getClasse() { return classe; }


    // Setter uniquement pour l'id
    public void setId(UUID id) { this.id = id; }
    // Ajoute ce setter à la fin de Aventurier.java
    public void setNiveau(int niveau) { this.niveau = niveau; }
    public void setNom(String nom) {
        if (nom == null || nom.isBlank()) {
            throw new IllegalArgumentException("Le nom ne peut pas être vide");
        }
        this.nom = nom;
    }
    public void setDescription(String description) { this.description = description; }
    public void setPhysique(int physique) { this.physique = physique; }
    public void setMental(int mental) { this.mental = mental; }
    public void setPerception(int perception) { this.perception = perception; }
    public void setClasse(Classe classe) { this.classe = classe; }
}