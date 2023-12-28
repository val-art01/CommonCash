import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './../swagger.json' assert { type: 'json' }

const app = express();
const PORT = process.env.PORT || 8000;

// les routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. API Documentation: http://localhost:${PORT}/api-docs/`)
})
