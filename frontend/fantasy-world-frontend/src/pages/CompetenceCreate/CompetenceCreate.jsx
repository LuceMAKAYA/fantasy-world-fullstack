import React, { useState } from 'react';
import axios from 'axios';
import './CompetenceCreate.css';

const CompetenceCreate = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        classeRequise: 'GARDIEN',
        niveauMinimum: 1,
        caracteristiqueMin: {
            caracteristique: 'PHYSIQUE',
            valeur: 10
        },
        competencesRequises: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // RÉCUPÉRATION DU TOKEN (Indispensable pour éviter la 403)
        const token = localStorage.getItem("token"); 

        try {
            const response = await axios.post('http://localhost:8081/competences', formData, {
                headers: {
                    // On envoie le token dans les headers
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201 || response.status === 200) {
                alert('📜 Compétence inscrite au Grimoire !');
                if (onSuccess) onSuccess(); // Retour au Roster (liste)
            }
        } catch (error) {
            console.error('Erreur détaillée:', error.response?.data || error.message);
            
            if (error.response?.status === 403) {
                alert("Droit d'accès refusé (403) : Vérifiez que vous êtes Admin.");
            } else {
                alert('Échec de la création. Vérifiez la console.');
            }
        }
    };

    return (
        <div className="create-container">
            <h2>📜 Nouvelle Compétence</h2>
            <form className="competence-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom de la compétence</label>
                    <input 
                        type="text" 
                        required
                        placeholder="Ex: Boule de Feu"
                        value={formData.nom}
                        onChange={(e) => setFormData({...formData, nom: e.target.value})} 
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Classe Requise</label>
                    <select 
                        value={formData.classeRequise}
                        onChange={(e) => setFormData({...formData, classeRequise: e.target.value})}
                    >
                        <option value="GARDIEN">Gardien</option>
                        <option value="ARCANISTE">Arcaniste</option>
                        <option value="MAITRE_D_ARMES">Maître d'armes</option>
                    </select>
                </div>

                <div className="carac-group">
                    <div className="form-group">
                        <label>Caractéristique</label>
                        <select 
                            value={formData.caracteristiqueMin.caracteristique}
                            onChange={(e) => setFormData({
                                ...formData, 
                                caracteristiqueMin: { ...formData.caracteristiqueMin, caracteristique: e.target.value }
                            })}
                        >
                            <option value="PHYSIQUE">Physique</option>
                            <option value="MENTAL">Mental</option>
                            <option value="PERCEPTION">Perception</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Valeur min.</label>
                        <input 
                            type="number" 
                            value={formData.caracteristiqueMin.valeur}
                            onChange={(e) => setFormData({
                                ...formData, 
                                caracteristiqueMin: { ...formData.caracteristiqueMin, valeur: parseInt(e.target.value) }
                            })}
                        />
                    </div>
                </div>

                <button type="submit" className="btn-submit">Inscrire au Grimoire</button>
            </form>
        </div>
    );
};

export default CompetenceCreate;