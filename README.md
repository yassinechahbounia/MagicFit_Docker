# 🚀 MagicFit – Plateforme Fitness Cloud-Native Intelligente

[![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![Angular](https://img.shields.io/badge/Angular-19.x-DD0031?style=for-the-badge&logo=angular)](https://angular.io)
[![AWS EKS](https://img.shields.io/badge/AWS_EKS-Orchestration-FF9900?style=for-the-badge&logo=amazonaws)](https://aws.amazon.com/eks/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Terraform](https://img.shields.io/badge/Terraform-IaC-623CE4?style=for-the-badge&logo=terraform)](https://www.terraform.io/)

**MagicFit** est une plateforme de fitness révolutionnaire conçue pour offrir une expérience immersive et connectée. Grâce à l'intégration d'un miroir intelligent (**MagicMirror**), d'un backend robuste en **Laravel** et d'un frontend moderne en **Angular**, MagicFit redéfinit la gestion de l'entraînement sportif dans un environnement Cloud-Native hautement évolutif.

---

## 📋 Sommaire
- [🌟 Points Forts](#-points-forts)
- [🏗️ Architecture du Système](#️-architecture-du-système)
- [🛠️ Stack Technique](#️-stack-technique)
- [💻 Installation & Configuration Locale](#-installation--configuration-locale)
- [☁️ Déploiement Cloud (AWS EKS)](#️-déploiement-cloud-aws-eks)
- [🔄 CI/CD & Automatisation](#-cicd--automatisation)
- [🔌 Aperçu de l'API](#-aperçu-de-lapi)
- [🛡️ Sécurité & Maintenance](#️-sécurité--maintenance)

---

## 🌟 Points Forts
- **Interface Miroir Intelligente** : Affichage temps réel, modules personnalisables et contrôle à distance.
- **Coach Virtuel IA** : Conseils personnalisés basés sur l'intelligence artificielle (DeepSeek).
- **Architecture Microservices** : Composants isolés pour une scalabilité et une fiabilité maximales.
- **Automatisation Totale** : Provisioning via Terraform et déploiement continu via GitHub Actions/GitLab CI.
- **Gestion Sécurisée** : Centralisation des secrets via AWS Secrets Manager.

---

## 🏗️ Architecture du Système

### Schéma d'Architecture Cloud
![Architecture AWS Cloud](Architecture%20AWS%20Cloud.png)

### Composants Applicatifs
1.  **magicfit-backend** : API REST développée avec Laravel 10. Gère la logique métier, l'authentification (Sanctum), et l'accès aux données.
2.  **magicfit-frontend** : Single Page Application (SPA) sous Angular 19. Interface utilisateur réactive et intuitive.
3.  **MagicMirror** : Interface miroir intelligente utilisant Node.js, communiquant en temps réel avec le backend.
4.  **Bases de Données** : MySQL/MariaDB pour le stockage persistant, orchestré localement par Docker ou via Amazon RDS en production.

---

## 🛠️ Stack Technique

| Couche | Technologie |
| :--- | :--- |
| **Backend** | Laravel 10 (PHP 8.2), MySQL 8.0/MariaDB 10.11 |
| **Frontend** | Angular 19, TypeScript, Bootstrap 5.3 |
| **Miroir** | MagicMirror² Core, Node.js 20 |
| **Conteneurisation** | Docker, Docker Compose |
| **Cloud (AWS)** | EKS, ECR, RDS, Secrets Manager, CloudWatch |
| **Infrastructure** | Terraform (Infrastructure as Code) |
| **CI/CD** | GitHub Actions, GitLab CI/CD |

---

## 💻 Installation & Configuration Locale

### 🛡️ Prérequis
- Docker Desktop
- Node.js v20+ & npm
- PHP 8.2 & Composer
- Git

### ⚡ Démarrage Rapide (Docker Compose)
Le moyen le plus simple de lancer MagicFit localement :
```powershell
# Cloner le dépôt
git clone <repository-url>
cd MagicFit_Docker

# Lancer tous les services
docker-compose up --build
```
*Services disponibles :*
- Frontend : `http://localhost:3000`
- Backend API : `http://localhost:8082`
- MagicMirror : `http://localhost:8081`
- Database : `localhost:3307`

### 🔧 Configuration Manuelle (Développement)
Pour travailler spécifiquement sur un composant :

**Backend :**
```bash
cd magicfit-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

**Frontend :**
```bash
cd magicfit-frontend
npm install
ng serve
```

---

## ☁️ Déploiement Cloud (AWS EKS)

L'infrastructure est provisionnée de manière entièrement automatisée.

### 1. Infrastructure (Terraform)
Le dossier `infra/` contient les scripts Terraform pour créer :
- Le VPC et les sous-réseaux (Public/Privé).
- Le cluster EKS et les Node Groups.
- Les registres ECR pour chaque service.

### 2. Orchestration Kubernetes
Les manifests dans `k8s/` gèrent le cycle de vie des pods :
- **HPA (Horizontal Pod Autoscaler)** : Ajustement automatique de la capacité du backend selon la charge CPU.
- **External Secrets** : Synchronisation sécurisée des secrets d'AWS Secrets Manager vers Kubernetes.
- **Ingress/LoadBalancer** : Exposition sécurisée des services vers l'extérieur.

```bash
# Déploiement manuel vers EKS
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/ -n magicfit
```

---

## 🔄 CI/CD & Automatisation

Le projet utilise **GitHub Actions** (principale) et **GitLab CI** pour l'automatisation.

### Pipeline Workflow :
1.  **Build** : Construction des images Docker multi-étapes pour optimiser le poids.
2.  **Push** : Envoi des images vers AWS ECR avec tags dynamiques (SHA du commit).
3.  **Deploy** : Mise à jour des manifests K8s et déploiement progressif sur EKS.
4.  **Verify** : Vérification de la santé des pods et rollback automatique en cas d'échec.

---

## 🔌 Aperçu de l'API

L'API Laravel expose des points d'accès sécurisés (Sanctum) :

- **Auth** : `POST /api/login`, `POST /api/register`
- **Programmes** : `GET /api/programmes`, `POST /api/programmes`
- **Exercices** : `GET /api/exercices`, `GET /api/exercices/{id}`
- **Réservations** : `GET /api/reservations`, `POST /api/reservations`
- **Miroir** : `POST /api/mirror/horloge/cacher`, `GET /api/mirror/status`

---

## 🛡️ Sécurité & Maintenance

- **Surveillance** : CloudWatch collecte les logs des pods et les métriques de performance.
- **Logging** : FluentBit est utilisé pour l'agrégation des logs vers CloudWatch Logs.
- **Mise à jour** : Les déploiements Kubernetes utilisent la stratégie `RollingUpdate` pour garantir un temps d'arrêt nul.

---

## 👥 Équipe & Licence
- **Équipe de Développement** : MagicFit Team.
- **Licence** : Ce projet est sous licence MIT.

---
*Note: Cette documentation est générée pour faciliter la prise en main technique du projet MagicFit.*
