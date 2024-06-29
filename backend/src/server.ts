import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import config from './config';
import { router } from './info/routes'; // Adjust the path as necessary

// Create a new express application instance
const app = express();
const httpServer = createServer(app);

// Apply CORS settings from the config
app.use(cors(config.corsOptions));

// Set the JSON limit from the config
app.use(express.json({ limit: config.jsonLimit }));

// Routes

app.use('/', router);

// Start the server using the port from config
httpServer.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

export { app, httpServer };