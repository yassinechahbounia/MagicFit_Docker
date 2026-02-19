# # =========================
# # 1️⃣ BUILD STAGE
# # =========================
# FROM node:22-alpine AS build

# RUN apk add --no-cache git make g++ python3

# WORKDIR /opt/magic_mirror

# # 1) Copier package manifests
# COPY package*.json ./

# # 2) Installer les dépendances de prod sans exécuter postinstall
# RUN npm ci --omit=dev --ignore-scripts

# # 3) Copier tout le code (vendor/ et fonts/ seront présents)
# COPY . .

# # 4) Installer vendor + fonts (équivalent du postinstall MagicMirror)
# RUN npm run install-vendor && npm run install-fonts && npm prune --omit=dev

# # Optionnel: créer config (si tu le génères dans l'image)
# RUN mkdir -p config

# EXPOSE 8080
# ENV NODE_ENV=production

# CMD ["npm", "run", "server"]


# =========================
# 1️⃣ BUILD STAGE
# =========================
FROM node:22-alpine AS build

RUN apk add --no-cache git make g++ python3

WORKDIR /opt/magic_mirror

# Copier package manifests
COPY package*.json ./

# Installer les dépendances prod sans exécuter postinstall
RUN npm ci --omit=dev --ignore-scripts

# Copier le reste du code
COPY . .

# Installer vendor + fonts + nettoyer
RUN npm run install-vendor && npm run install-fonts && npm prune --omit=dev

# Créer config si absent
RUN mkdir -p config

# =========================
# 2️⃣ RUNTIME STAGE (image minimale)
# =========================
FROM node:22-alpine

WORKDIR /opt/magic_mirror

# Copier uniquement le nécessaire depuis le build
COPY --from=build /opt/magic_mirror/node_modules ./node_modules
COPY --from=build /opt/magic_mirror/js ./js
COPY --from=build /opt/magic_mirror/css ./css
COPY --from=build /opt/magic_mirror/modules ./modules
COPY --from=build /opt/magic_mirror/config ./config
COPY --from=build /opt/magic_mirror/vendor ./vendor
COPY --from=build /opt/magic_mirror/fonts ./fonts
COPY --from=build /opt/magic_mirror/serveronly ./serveronly
COPY --from=build /opt/magic_mirror/clientonly ./clientonly
COPY --from=build /opt/magic_mirror/index.html ./
COPY --from=build /opt/magic_mirror/package.json ./
COPY --from=build /opt/magic_mirror/translations ./translations

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "./serveronly"]