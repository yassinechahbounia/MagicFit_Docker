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

FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    libpng libjpeg-turbo freetype libzip oniguruma bash tini curl

RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS libpng-dev libjpeg-turbo-dev freetype-dev libzip-dev oniguruma-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) pdo_mysql mbstring bcmath gd zip \
  && apk del .build-deps

WORKDIR /var/www/html
COPY --from=build /app /var/www/html

# Créer les dossiers Laravel AVANT le chown (absents du .gitignore)
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
CMD ["php-fpm"]
