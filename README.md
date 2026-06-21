# 🚀 Portfolio — Jonathan Leite Teixeira

> Portfolio fullstack avec back-office d'administration intégré, construit de zéro avec **Java/Spring Boot** et **Angular**.

🔗 **[jonathanleite.fr](https://jonathanleite.fr)**

---

## 📖 À propos

Ce projet n'est pas un simple portfolio statique : c'est une **application web complète** avec un vrai backend, une base de données relationnelle, une authentification sécurisée, et un système d'administration permettant de gérer **tout** le contenu du site (textes, compétences, projets, images) directement depuis l'interface, sans jamais toucher au code.

L'objectif était double : présenter mon parcours et mes projets, tout en démontrant des compétences concrètes en développement Java/Angular dans une application réellement déployée en production.

---

## ✨ Fonctionnalités

### Côté visiteur
- Présentation personnelle, parcours, formation et expérience
- Catalogue de compétences techniques avec niveaux de maîtrise
- Showcase de projets avec carrousel de slides détaillées (animation *shared element transition*)
- Formulaire de contact avec envoi d'email réel

### Côté administration (édition inline)
- Authentification sécurisée par **JWT**
- Édition de **tout** le contenu directement sur les pages publiques (pas de back-office séparé)
- CRUD complet sur les projets, compétences, formations, expériences
- Réordonnancement par **glisser-déposer** (drag & drop) avec persistance en base
- Upload d'images avec **recadrage interactif** avant envoi
- Nettoyage automatique des fichiers obsolètes lors du remplacement d'une image

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Angular 22     │  HTTPS  │  Spring Boot 3.5  │   JDBC  │   PostgreSQL    │
│   (Vercel)       │ ──────> │   (Railway)       │ ──────> │   (Railway)     │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                      │
                                      ├──> Railway Volume (stockage images)
                                      └──> Resend API (envoi d'emails)
```

| Composant | Service | Rôle |
|---|---|---|
| Nom de domaine | **OVH** | `jonathanleite.fr` |
| Frontend | **Vercel** | Hébergement de l'application Angular |
| Backend | **Railway** | Hébergement de l'API Spring Boot |
| Base de données | **Railway (PostgreSQL)** | Stockage des données |
| Stockage fichiers | **Railway Volumes** | Stockage persistant des images uploadées |
| Emails | **Resend** | Envoi des messages du formulaire de contact |

---

## 🛠️ Stack technique

### Backend
- **Java 21** / **Spring Boot 3.5**
- **Spring Security** + **JWT** pour l'authentification
- **Spring Data JPA** / **Hibernate**
- **PostgreSQL**
- **Flyway** pour le versionnement de la base de données
- **Resend** (SDK Java) pour l'envoi d'emails transactionnels
- **JUnit 5** / **Mockito** pour les tests unitaires et d'intégration

### Frontend
- **Angular 22** (composants standalone, signals)
- **TypeScript**
- **Tailwind CSS**
- **Angular CDK** (drag & drop)
- **ngx-image-cropper** (recadrage d'images)
- **Vitest** pour les tests unitaires

### DevOps
- **Git** / **GitHub**
- **Docker** (PostgreSQL en local)
- Variables d'environnement pour la configuration multi-environnements (local / production)
- CI/CD via déploiements automatiques GitHub → Vercel / Railway

---

## 📂 Structure du projet

```
portfolio/
├── portfolio-backend/          # API Spring Boot
│   └── src/main/java/.../
│       ├── controller/          # Endpoints REST
│       ├── service/             # Logique métier
│       ├── repository/          # Accès aux données (Spring Data JPA)
│       ├── entity/               # Entités JPA
│       ├── dto/                  # Objets de transfert (auth, contact)
│       ├── security/             # JWT (génération, filtre)
│       └── config/               # Sécurité, CORS, fichiers statiques
│
└── portfolio-frontend/          # Application Angular
    └── src/app/
        ├── components/           # Composants réutilisables (navbar)
        ├── pages/                # Pages associées aux routes
        ├── services/             # Appels API
        └── guards/               # Protection des routes
```

---

## 🔐 Sécurité

- Mots de passe hachés avec **BCrypt**
- Authentification par token **JWT** (stateless)
- Routes API protégées selon le rôle (lecture publique, écriture authentifiée)
- Credentials et clés API exclusivement gérés via variables d'environnement
- CORS configuré explicitement par environnement

---

## 🧪 Tests

Le projet inclut des tests unitaires et d'intégration côté backend (services et controllers avec Mockito/MockMvc) et des tests unitaires côté frontend (services Angular avec `HttpClientTestingModule`).

---

## 📌 Roadmap

- [ ] Assistant conversationnel basé sur les données du site
- [ ] Slides détaillées pour le projet "Ce portfolio" lui-même

---

## 👤 Auteur

**Jonathan Leite Teixeira**
Développeur Full Stack — Diplômé d'un Master MIAGE
