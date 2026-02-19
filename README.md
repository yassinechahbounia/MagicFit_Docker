# 🎯 MagicFit - Plateforme de Gestion de Salle de Sport Révolutionnaire

[![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![Angular](https://img.shields.io/badge/Angular-19.x-DD0031?style=flat&logo=angular)](https://angular.io)
[![MagicMirror](https://img.shields.io/badge/MagicMirror-2.x-000000?style=flat)](https://magicmirror.builders)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)](https://mysql.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat&logo=bootstrap)](https://getbootstrap.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MagicFit est une plateforme complète et innovante de gestion de salle de sport qui révolutionne l'expérience utilisateur grâce à l'intégration d'une interface miroir intelligente (MagicMirror). Le projet combine un backend robuste en Laravel, un frontend moderne en Angular, et une intégration avancée avec MagicMirror pour créer une expérience immersive et connectée.

## 🌟 Fonctionnalités Principales

### 👥 Application Web (Frontend + Backend)

#### Gestion des Utilisateurs
- **Système d'authentification complet** : Inscription, connexion, récupération de mot de passe
- **Rôles et permissions** : Admin, Coach, Utilisateur avec accès différencié
- **Profils personnalisés** : Gestion des informations personnelles et préférences

#### Programmes d'Entraînement
- **Création personnalisée** : Programmes adaptés aux objectifs individuels
- **Bibliothèque d'exercices** : Base de données complète avec descriptions et GIFs
- **Suivi des performances** : Historique des poids, répétitions, et progrès
- **Planification intelligente** : Génération automatique de programmes

#### Outils Fitness Avancés
- **Calculateurs intégrés** : IMC, calories, macronutriments, objectifs personnalisés
- **Coach virtuel IA** : Conseils personnalisés via DeepSeek
- **Suivi des métriques** : Graphiques et analyses de progression

#### Système de Réservations
- **Créneaux horaires** : Réservation de machines et équipements
- **Gestion des conflits** : Évitement des doubles réservations
- **Notifications** : Rappels et confirmations automatiques

### 🪞 Intégration MagicMirror

#### Affichage Intelligent
- **Interface adaptative** : Affichage qui s'adapte au contexte d'utilisation
- **Contrôle à distance** : Masquer/afficher des modules via l'application web
- **Informations en temps réel** : Mise à jour automatique des données

#### Modules Personnalisés
- **MMM-MagicFitButton** : Bouton d'accès à l'interface MagicFit
- **MMM-InteractiveMap** : Interface immersive en plein écran
- **MMM-WeatherOrNot** : Affichage météo personnalisé
- **Contrôle d'horloge** : Masquage/affichage programmable

## 🏗️ Architecture Technique


capture architecture

### Backend (Laravel 10.x)
- **Framework** : Laravel 10.x avec architecture MVC
- **Authentification** : Laravel Sanctum pour API tokens sécurisés
- **Base de Données** : MySQL avec migrations Eloquent et relations complexes
- **API RESTful** : Endpoints documentés avec pagination et filtres
- **Validation** : Règles de validation robustes et messages d'erreur personnalisés
- **Middleware** : Authentification, CORS, rate limiting

### Frontend (Angular 19.x)
- **Framework** : Angular 19.x avec standalone components
- **UI/UX** : Bootstrap 5.3 + Bootstrap Icons pour interface moderne
- **State Management** : Services Angular avec observables RxJS
- **Routing** : Guards d'authentification et lazy loading
- **HTTP Client** : Intercepteurs pour gestion centralisée des requêtes
- **Forms** : Reactive Forms avec validation temps réel

### MagicMirror²
- **Core System** : Framework modulaire pour interfaces miroir
- **Custom Modules** : Intégration spécifique MagicFit
- **Real-time Communication** : Notifications et mises à jour live
- **Responsive Design** : Adaptation automatique aux écrans

## 📋 Prérequis Système

### Environnement de Développement
- **Système d'exploitation** : Windows 10/11, macOS, ou Linux
- **Serveur Web** : WampServer (Windows) ou XAMPP (Cross-platform) avec MySQL et Apache
- **PHP** : Version 8.1 ou supérieure (recommandé: 8.2)
- **Node.js** : Version 18.x ou supérieure (recommandé: 20.x LTS)
- **NPM** : Inclus avec Node.js (version 9.x ou supérieure)
- **Composer** : Version 2.x pour gestion des dépendances PHP
- **Git** : Version 2.x pour contrôle de version

## 🚀 Installation et Configuration

### 📥 1. Clonage du Repository
```bash
# Clonez le repository MagicFit
git clone <repository-url>
cd MagicFit

# Vérifiez la structure des dossiers
ls -la
```

### 🔧 2. Configuration du Backend (Laravel)

#### Installation des Dépendances PHP
```bash
cd magicfit-backend

# Installation des dépendances via Composer
composer install

# Vérification de l'installation
composer --version
php artisan --version
```
#### Migration de la Base de Données
```bash
# Exécution des migrations
php artisan migrate

# (Optionnel) Peuplement avec des données de test
php artisan db:seed

# Vérification du statut des migrations
php artisan migrate:status
```

### 🎨 3. Configuration du Frontend (Angular)

#### Installation des Dépendances Node.js
```bash
cd ../magicfit-frontend

# Installation des dépendances
npm install

# Vérification des versions
node --version
npm --version
ng version
```

### 🪞 4. Configuration de MagicMirror

#### Installation des Dépendances
```bash
cd ../MagicMirror

# Installation des dépendances MagicMirror
npm install

# Installation des fonts (optionnel mais recommandé)
npm run install-fonts
```

## 🚀 Démarrage de l'Application

### ⚡ Démarrage Automatique (Recommandé)

#### Script Windows (`start_magicfit.bat`)
```cmd
# Double-cliquez simplement sur start_magicfit.bat
# Ou exécutez en ligne de commande :
.\start_magicfit.bat
```

**Ce que fait le script automatiquement :**
1. ✅ Vérification de WampServer/XAMPP
2. 🔧 Démarrage du backend Laravel (port 8000)
3. 🎨 Démarrage du frontend Angular (port 4200)
4. 🪞 Démarrage de MagicMirror (port 8081)
5. 🌐 Ouverture automatique de MagicMirror dans le navigateur

### 🔧 Démarrage Manuel (Pour Développement)

#### 1. Préparation de la Base de Données
```bash
# Assurez-vous que WampServer/XAMPP est démarré
# MySQL et Apache doivent être actifs
```

#### 2. Backend Laravel
```bash
cd magicfit-backend

# Démarrage du serveur de développement
php artisan serve --host=127.0.0.1 --port=8000

#### 3. Frontend Angular
```bash
cd magicfit-frontend

# Démarrage avec proxy vers le backend
ng serve --host=0.0.0.0 --port=4200

# Ou en mode production
ng serve --host=0.0.0.0 --port=4200 --configuration production
```

#### 4. MagicMirror
```bash
cd MagicMirror

# Démarrage en mode développement
npm start
```

## 📖 Guide d'Utilisation

### 🌐 Interface Web MagicFit

#### Accès et Authentification
1. **Accédez à l'application** : `http://localhost:4200`
2. **Inscription** : Créez un compte avec email et mot de passe
3. **Connexion** : Utilisez vos identifiants pour accéder à votre espace

#### Fonctionnalités Principales

##### 👤 Gestion du Profil
- **Informations personnelles** : Mise à jour des données utilisateur
- **Préférences** : Paramètres d'affichage et de notification
- **Historique** : Suivi des activités et progrès

##### 💪 Programmes d'Entraînement
- **Créer un programme** : Définissez vos objectifs et préférences
- **Bibliothèque d'exercices** : Parcourez les exercices disponibles
- **Suivi des séances** : Enregistrez vos performances
- **Progression** : Visualisez vos améliorations avec des graphiques

##### 🏋️ Exercices et Workouts
- **Base de données** : Plus de 100 exercices avec descriptions
- **GIFs animés** : Visualisez les mouvements corrects
- **Filtres avancés** : Par muscle, difficulté, équipement
- **Favoris** : Sauvegardez vos exercices préférés

##### 📅 Système de Réservations
- **Créneaux disponibles** : Réservez machines et équipements
- **Conflits évités** : Système intelligent de prévention
- **Rappels** : Notifications avant vos réservations
- **Historique** : Suivi de vos réservations passées

##### 🧮 Outils Fitness
- **Calculateur IMC** : Indice de masse corporelle
- **Calories** : Estimation des besoins journaliers
- **Macronutriments** : Répartition optimale
- **Objectifs** : Définition d'objectifs personnalisés

##### 🤖 Coach Virtuel IA
- **Conseils personnalisés** : Adaptés à votre profil
- **Recommandations** : Exercices et programmes sur mesure
- **Suivi intelligent** : Ajustements basés sur vos progrès

### 🪞 Interface MagicMirror

#### Modules Disponibles

##### Horloge (`clock`)
- **Affichage** : Heure et date en temps réel
- **Contrôle** : Masquage/affichage via l'app web
- **Style** : Personnalisé pour l'esthétique MagicFit

##### Météo (`MMM-WeatherOrNot`)
- **Localisation** : Kenitra, Maroc (configurable)
- **Informations** : Température, conditions, prévisions
- **Style** : Interface moderne et lisible

##### Actualités (`newsfeed`)
- **Sources** : Hespress (Maroc) et autres
- **Filtrage** : Actualités sportives prioritaires
- **Mise à jour** : Automatique toutes les heures

##### Musique (`MMM-Spotify`)
- **Contrôle** : Interface de contrôle Spotify
- **Statut** : Affichage de la piste en cours
- **Commandes** : Play/pause, suivant/précédent

##### Arrière-plan (`MMM-BackgroundSlideshow`)
- **Images** : Rotation automatique d'images fitness
- **Transitions** : Effets fluides entre les images
- **Thèmes** : Adaptés à l'ambiance salle de sport

##### Bouton MagicFit (`MMM-MagicFitButton`)
- **Accès** : Bouton pour ouvrir l'interface MagicFit
- **Position** : Coin inférieur droit
- **Style** : Bouton bleu avec effet hover

##### Interface Interactive (`MMM-InteractiveMap`)
- **Affichage** : Interface MagicFit en plein écran
- **Contrôle** : Bouton de fermeture (✕)
- **Navigation** : Accès complet à l'application web

#### Contrôle à Distance
- **Via l'application web** : Contrôlez les modules MagicMirror
- **API REST** : Endpoints pour masquage/affichage
- **Temps réel** : Modifications instantanées

## 🤝 Contribution

### 📋 Processus de Contribution

1. **Fork le Projet**
   ```bash
   git clone https://github.com/votre-username/MagicFit.git
   cd MagicFit
   ```

2. **Créer une Branche**
   ```bash
   git checkout -b feature/NouvelleFonctionnalite
   # ou
   git checkout -b fix/CorrectionBug
   # ou
   git checkout -b docs/AmeliorationDocumentation
   ```

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe de Développement

### 🎯 Rôles et Responsabilités

| Rôle | Responsabilités | Technologies |
|------|-----------------|--------------|
| **Lead Backend** | Architecture API, Base de données | Laravel, MySQL, PHP |
| **Lead Frontend** | Interface utilisateur, UX/UI | Angular, TypeScript, Bootstrap |
| **MagicMirror Dev** | Intégration miroir, Modules personnalisés | JavaScript, Node.js |
| **DevOps** | Déploiement, CI/CD, Monitoring | Docker, GitHub Actions |
| **QA/Test** | Tests, Qualité, Documentation | PHPUnit, Jest, Cypress |

### 📧 Contact

- **Email** : contact@magicfit.com
- **GitHub Issues** : [Signaler un bug](https://github.com/magicfit/MagicFit/issues)
- **Discussions** : [Forum communautaire](https://github.com/magicfit/MagicFit/discussions)

## 🔄 Roadmap et Versions

### ✅ Version Actuelle : v1.0.0 (Stable)

**Fonctionnalités implémentées :**
- ✅ Système d'authentification complet
- ✅ Gestion des programmes d'entraînement
- ✅ Base de données d'exercices
- ✅ Système de réservations
- ✅ Intégration MagicMirror
- ✅ Outils fitness (IMC, calories)
- ✅ Interface responsive

### 🚧 Prochaines Versions

#### v1.1.0 (Q1 2024)
- 🔄 Coach virtuel IA avancé
- 🔄 Notifications push
- 🔄 Synchronisation wearables
- 🔄 Mode hors ligne

#### v1.2.0 (Q2 2024)
- 🔄 Application mobile (React Native)
- 🔄 Analytics avancés
- 🔄 Intégration réseaux sociaux
- 🔄 Mode multilingue

#### v2.0.0 (Q3 2024)
- 🔄 Architecture microservices
- 🔄 API GraphQL
- 🔄 Intelligence artificielle prédictive
- 🔄 Réalité augmentée pour les exercices

### 📋 Backlog Priorisé
1. **Performance** : Optimisation des requêtes, cache Redis
2. **Sécurité** : Audit complet, chiffrement des données
3. **UX/UI** : Refonte complète de l'interface
4. **Mobile** : Application native iOS/Android
5. **IA** : Recommandations personnalisées avancées

## 🙏 Remerciements

### 📚 Technologies et Frameworks
- **Laravel** : Pour le backend robuste
- **Angular** : Pour le frontend moderne
- **MagicMirror²** : Pour l'intégration miroir
- **Bootstrap** : Pour l'interface élégante

### 👥 Contributeurs
- Équipe de développement MagicFit
- Communauté open source
- Utilisateurs et testeurs beta

### 🔗 Ressources Externes
- [Documentation Laravel](https://laravel.com/docs)
- [Guide Angular](https://angular.io/guide)
- [MagicMirror Docs](https://docs.magicmirror.builders)
- [Bootstrap Docs](https://getbootstrap.com/docs)

---

**🎯 MagicFit - Révolutionnez votre expérience fitness !**
