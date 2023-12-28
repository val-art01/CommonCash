// webpack.config.js
const path = require('path');

module.exports = {
  entry: './app/vu.js',  // Fichier d'entrée de votre application
  output: {
    filename: 'bundle.js',  // Nom du fichier de sortie
    path: path.resolve(__dirname, 'dist'),  // Dossier de sortie
  },
};