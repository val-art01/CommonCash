import express from 'express';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' assert { type: 'json' }
import {connectToDB} from './database/connectDB.js';

const app = express();
const PORT = process.env.PORT || 8000;

connectToDB();

//configuration du middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// les routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/", (_, res) => {
    res.send('ok')
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. API Documentation: http://localhost:${PORT}/api-docs/`)
})

export default app;