# Utilisation de Node.js 20 (fixe le problème de version NestJS)
FROM node:20

# Définition du répertoire de travail
WORKDIR /usr/src/app

# Copie et installation des dépendances
COPY package*.json ./
RUN npm install --omit=dev  # Installe uniquement les dépendances de production

# Copie du code source de l'application
COPY . .

# Installation des dépendances de développement (ex. Jest) et nettoyage
RUN npm install --only=dev && npm install -g jest && npm cache clean --force

# Exposition du port de l'application
EXPOSE 8050

# Commande de lancement de l'application
CMD ["node", "server.js"]
