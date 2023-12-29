
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = `${process.env.DB_CONNECTION}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;

const connectToDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log("Connecté avec succès à la base de données");
    } catch (error) {
      console.error("Erreur lors de la connexion à la base de données : ", error);
    }
};

export {connectToDB}

