FROM node:22-alpine

WORKDIR /opt/magic_mirror

# Install necessary system packages for node-gyp and other native dependencies if needed
RUN apk add --no-cache make gcc g++ python3 git

# Copy package files
COPY package.json package-lock.json* ./

# Copy all the rest of the files (needed for postinstall hook which requires 'vendor' and 'fonts' dirs)
COPY . .

# Install npm dependencies (production tier)
RUN npm install --no-audit --no-fund --omit=dev --ignore-scripts

# Expose port (MagicMirror defaults to 8080)
EXPOSE 8080

# Start MagicMirror in server only mode
CMD ["npm", "run", "server"]
##