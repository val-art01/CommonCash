// backend.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ma_base_de_donnees', { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/data', async (req, res) => {
    try {
      const data = await DataModel.findOne();
      res.json(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données depuis la base de données', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.post('/api/data', async (req, res) => {
    try {
      const newData = req.body;
      const createdData = await DataModel.create(newData);
      res.json({ message: 'Données enregistrées avec succès', data: createdData });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données dans la base de données', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur écoutant sur le port ${PORT}`);
});
