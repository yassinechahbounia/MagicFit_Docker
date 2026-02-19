FROM composer:2.7 AS build

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY composer.json composer.lock ./

# Installer les dépendances sans les packages de dev
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-scripts \
    --no-progress \
    --optimize-autoloader
# Copier le reste du code source
COPY . .

# Optimiser l'autoloader
#RUN composer dump-autoload --optimize

# ---------------------------
# Runtime stage (PHP-FPM)
# ---------------------------
FROM php:8.2-fpm-alpine

# Installer les packages nécessaires pour PHP et les extensions
RUN apk add --no-cache \
    libpng \
    libjpeg-turbo \
    freetype \
    libzip \
    oniguruma \
    bash \
    tini \
    curl

# Installer les dépendances de build pour compiler les extensions PHP
RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    oniguruma-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) pdo_mysql mbstring bcmath gd zip \
  && apk del .build-deps  # Supprimer les dépendances de build pour réduire la taille de l'image

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le code optimisé depuis le build
COPY --from=build /app /var/www/html

# Permissions pour Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Exposer le port FPM
EXPOSE 9000

# Utiliser tini comme init system pour gérer les signaux correctement
ENTRYPOINT ["/sbin/tini", "--"]

# Lancer PHP-FPM
CMD ["php-fpm"]