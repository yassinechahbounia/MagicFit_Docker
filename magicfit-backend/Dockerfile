FROM composer:2.7 AS build

WORKDIR /app
COPY composer.json ./
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-scripts \
    --no-progress \
    --optimize-autoloader
COPY . .

FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    bash \
    tini \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions more reliably
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions \
    && install-php-extensions pdo_mysql mbstring bcmath gd zip

WORKDIR /var/www/html
COPY --from=build /app /var/www/html

# Copier le script d'entrée
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Créer les dossiers Laravel AVANT le chown
RUN mkdir -p \
      storage/logs \
      storage/framework/cache \
      storage/framework/sessions \
      storage/framework/views \
      bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 9000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/local/bin/docker-entrypoint.sh"]
