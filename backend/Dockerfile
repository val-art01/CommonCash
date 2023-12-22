# Utilisez une image Node.js comme base
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le fichier package.json et le fichier package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le répertoire de travail
COPY . .

# Exposez le port sur lequel le serveur fonctionne
EXPOSE 8000

# Commande à exécuter lors du démarrage du conteneur
CMD ["node", "/server.js"]
