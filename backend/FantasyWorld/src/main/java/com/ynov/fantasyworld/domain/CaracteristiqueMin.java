package com.ynov.fantasyworld.domain;

public class CaracteristiqueMin {

    private Caracteristique caracteristique;
    private int valeur;

    public CaracteristiqueMin(Caracteristique caracteristique, int valeur) {
        this.caracteristique = caracteristique;
        this.valeur = valeur;
    }

    public Caracteristique getCaracteristique() { return caracteristique; }
    public int getValeur() { return valeur; }
    public void setCaracteristique(Caracteristique caracteristique) { this.caracteristique = caracteristique; }
    public void setValeur(int valeur) { this.valeur = valeur; }
}