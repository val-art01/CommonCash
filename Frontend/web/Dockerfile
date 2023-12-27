# Utiliser une image Node.js
FROM node:20.9.0

# Créer le dossier de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le fichier package.json et le fichier package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copiez le reste des fichiers dans le répertoire de travail
COPY . .

# Build de l'application frontend
RUN npm run build

# Exposer le port nécessaire par l'application
EXPOSE 5173

# Commande pour démarrer le serveur frontend
CMD ["npm", "run", "dev"]
