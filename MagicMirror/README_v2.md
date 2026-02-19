Backend : Laravel

Frontend : Angular

Le projet est déjà téléchargé (zip ou git clone)

Tu as un dossier miroir / MagicMirror (ou un autre projet) dans un autre dossier mais qui dépend du même projet

1️⃣ Prérequis (important)

Assure-toi d’avoir installé sur ta machine :

Backend (Laravel)

PHP (version compatible avec le projet)

Composer

MySQL / PostgreSQL (selon le projet)

Frontend (Angular)

Node.js (LTS recommandé)

npm (ou yarn)

Angular CLI

npm install -g @angular/cli

2️⃣ Structure typique du projet

Exemple :

my-project/
│
├── backend/        (Laravel)
├── frontend/       (Angular)
└── magic-mirror/   (projet miroir)

3️⃣ Installer les packages Laravel (backend)
3.1 Aller dans le dossier backend
cd my-project/backend

3.2 Installer les dépendances PHP
composer install


👉 Cette commande :

lit composer.json

installe tout dans vendor/

3.3 Créer le fichier .env

Si tu n’as pas de .env :

cp .env.example .env


Puis configurer la base de données dans .env :

DB_DATABASE=nom_db
DB_USERNAME=root
DB_PASSWORD=

3.4 Générer la clé Laravel
php artisan key:generate

3.5 Lancer les migrations (si nécessaire)
php artisan migrate

3.6 Lancer le serveur Laravel
php artisan serve


Par défaut :

http://127.0.0.1:8000

4️⃣ Installer les packages Angular (frontend)
4.1 Aller dans le dossier frontend
cd ../frontend

4.2 Installer les dépendances Node
npm install


👉 Cette commande :

lit package.json

crée le dossier node_modules/

⚠️ Si erreur :

npm install --legacy-peer-deps

4.3 Lancer Angular
ng serve


Par défaut :

http://localhost:4200

5️⃣ Connecter Angular au backend Laravel

Dans Angular, vérifie :

environment.ts

environment.prod.ts

Exemple :

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api'
};

6️⃣ Installer le projet Mirror / MagicMirror (autre dossier)
6.1 Aller dans le dossier miroir
cd ../magic-mirror

6.2 Installer ses dépendances

Selon le type du projet :

S’il est en Node.js :
npm install
npm start