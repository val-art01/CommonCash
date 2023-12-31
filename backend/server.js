import express from 'express';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' assert { type: 'json' }
import {connectToDB} from './database/connectDB.js';
import userRoute from './routes/userRoute.js'

const app = express();
const PORT = process.env.PORT || 8000;

connectToDB();

//configuration du middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// les routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users', userRoute);

app.use((req, res) => {
    res.status(404).json({ message: `API introuvable à l'adresse ${req.url}` })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. API Documentation: http://localhost:${PORT}/api-docs/`)
})

export default app;