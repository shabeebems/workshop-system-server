import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import workshopRouter from './routes/workshop.routes';
import { corsMiddleware } from './config/cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
connectDB();

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true
}));


app.use('/api/auth', authRouter);
app.use('/api/workshop', workshopRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

