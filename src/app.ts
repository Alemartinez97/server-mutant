import express from 'express';
import { json } from 'body-parser';
import routes from './routes';
import connectDb from './config/db';
import authService from './services/authService';

const app = express();


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

connectDb();

app.use(json());
authService.configurePassport();
app.use(routes);
export default app;
