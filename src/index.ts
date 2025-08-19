import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import adminRouter from './routes/admin.routes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true
}));


app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

