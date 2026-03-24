FROM node:22-alpine

WORKDIR /opt/magicmirror

RUN apk add --no-cache make gcc g++ python3 git

# Copie des fichiers npm
COPY package.json package-lock.json* ./

# Désactiver les scripts postinstall / install-vendor / install-fonts AVANT npm install
RUN npm set-script postinstall "" \
  && npm set-script install-vendor "" \
  && npm set-script install-fonts ""

# Copier le reste des fichiers (modules, config, etc.)
COPY . .

# Install deps sans scripts
RUN npm install --no-audit --no-fund --omit=dev --ignore-scripts

EXPOSE 8080

CMD ["npm", "run", "server"]
