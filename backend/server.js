import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import {connectToDB} from './src/utils/mongoose.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import groupRoute from './routes/groupRoute.js';
import spendRoute from './routes/expenseRoute.js';
import balanRepay from './routes/balanceRepayment.js'

const app = express();
const PORT = process.env.PORT || 8080;
const specs = swaggerJsdoc(swaggerDocument);

connectToDB();

//configuration du middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

// les routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/users', userRoute);
app.use('/auht', authRoute);
app.use('/group', groupRoute);
app.use('/spend', spendRoute);
app.use('/balanRepay', balanRepay);

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use((req, res) => {
    res.status(404).json({ message: `API introuvable à l'adresse ${req.url}` })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. API Documentation: http://localhost:${PORT}/api-docs/`)
})

export default app;