#!/bin/sh
set -e

cd /var/www/html

# Générer le fichier .env depuis les variables d'environnement K8s (ConfigMap + Secrets)
cat > .env <<EOF
APP_NAME=${APP_NAME:-MagicFit}
APP_ENV=${APP_ENV:-production}
APP_KEY=${APP_KEY:-}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-http://localhost}

LOG_CHANNEL=${LOG_CHANNEL:-stderr}
LOG_LEVEL=${LOG_LEVEL:-info}

DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST:-magicfit-db}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-magicfit_mirror}
DB_USERNAME=${DB_USERNAME:-magicfit_user}
DB_PASSWORD=${DB_PASSWORD:-}

QUEUE_CONNECTION=${QUEUE_CONNECTION:-sync}
SQS_QUEUE=${SQS_QUEUE:-}
SQS_PREFIX=${SQS_PREFIX:-}
AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-us-east-1}

CACHE_DRIVER=${CACHE_DRIVER:-file}
SESSION_DRIVER=${SESSION_DRIVER:-file}
SESSION_LIFETIME=120
EOF

# Permissions Laravel
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Attendre que la DB soit prête (max 30 secondes)
echo "⏳ Waiting for database..."
RETRIES=15
until php artisan db:monitor --databases=mysql > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "  DB not ready, retrying in 2s... ($RETRIES left)"
  RETRIES=$((RETRIES-1))
  sleep 2
done

if [ $RETRIES -eq 0 ]; then
  echo "⚠️  DB not reachable after 30s, starting anyway..."
else
  echo "✅ DB is ready"

  # Run migrations
  echo "🔄 Running migrations..."
  php artisan migrate --force --no-interaction || echo "⚠️  Migration failed, continuing..."

  # Cache config
  php artisan config:cache || true
  php artisan route:cache || true
fi

echo "🚀 Starting php-fpm..."
exec php-fpm
