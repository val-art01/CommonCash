# Utilisez une image Node.js comme base
FROM node:lts-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le fichier package.json et le fichier package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le répertoire de travail
COPY . .

# Exposez le port sur lequel le serveur fonctionne
EXPOSE 8080

# Commande à exécuter lors du démarrage du conteneur
CMD ["npm", "start"]