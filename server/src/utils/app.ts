import express, { Express } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

const corsOptions: cors.CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

export default app;
