# ⚔️ Fantasy World — Fullstack Project

Application de gestion d'aventuriers Fantasy, construite en groupe dans le cadre du module Web Full Stack M1 Dev FullStack 2025/2026.

## 👥 Équipe

- Luce Makaya
- Salma Kacem
- [Prénom Nom]

## 🗂️ Structure du monorepo

fantasy-world-fullstack/
├── documentation/ # Contrat OpenAPI + docs d'architecture + README.md
├── backend/ # API REST Spring Boot
├── frontend/ # Interface React

## 🚀 Lancer le projet

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

→ Disponible sur http://localhost:8080

### Frontend

```bash
cd frontend
npm install
npm run dev
```

→ Disponible sur http://localhost:5173

## 🔐 Comptes disponibles

| Compte | Mot de passe | Rôle   |
| ------ | ------------ | ------ |
| admin  | admin123     | ADMIN  |
| user   | user123      | VIEWER |

## 📋 Fonctionnalités

### ✅ Existant

- CRUD aventuriers avec pagination
- Authentification JWT
- Protection par rôle (ADMIN / VIEWER)
- Logging MongoDB
- Interface React responsive

### 🔄 En cours

- Gestion des compétences (F1-F10)
- Association aventuriers/compétences
- Vues enrichies (disponibles/bloquées)
- Création de compte (FU1)

## 📄 Documentation

- [Contrat OpenAPI](./documentation/openapi.yaml)
- [README Backend](./backend/README.md)
- [README Frontend](./frontend/README.md)

## 🔗 Liens

- Backend : http://localhost:8080
- Frontend : http://localhost:5173
- Console H2 : http://localhost:8080/h2
- GitHub Project : [lien vers le board]
