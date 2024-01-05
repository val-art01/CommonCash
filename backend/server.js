import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: 'json' };
import {connectToDB} from './src/services/mongoose.js';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';

const app = express();
const PORT = process.env.PORT || 8080;

connectToDB();

//configuration du middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

// les routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/users', userRoute);
app.use('/', authRoute);

app.use((req, res) => {
    res.status(404).json({ message: `API introuvable à l'adresse ${req.url}` })
})

// app.get('/logout', (req, res) => {
//     req.logout();
//     req.session.destroy();
//     res.send('Goodbye!');
// })

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. API Documentation: http://localhost:${PORT}/api-docs/`)
})

export default app;