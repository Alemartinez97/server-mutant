import express from 'express';
import { json } from 'body-parser';
import routes from './routes'; 
import connectDb from './config/db'; 
import authService from './services/authService';

const app = express();

connectDb();

app.use(json());
authService.configurePassport();
app.use(routes);
export default app;
