require("dotenv").config();
import cors from 'cors';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import adminRouter from './routes/admin.routes';
import deleteRouter from './routes/delete.routes';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response, response } from 'express';
import config from 'config';
import AppError from './utilities/appError';
import { PrismaClient } from '@prisma/client';
//import validateEnv from './utilities/validateEnv';
const
  app = express(),
  port = process.env.PORT || 8000,
  prisma = new PrismaClient();

// The validateEnv.ts ensures that the environment variables you provided
// in the .env have their correct Typescript types
// validateEnv();

async function bootstrap() {
  // TEMPLATE ENGINE
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/views`);

  // MIDDLEWARE

  // 1.Body Parser
  app.use(express.json({ limit: '10kb' }));

  // 2. Cookie Parser
  app.use(cookieParser());

  // 2. Cors
  app.use(cors());

  // ROUTES
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/delete', deleteRouter);

  // UNHANDLED ROUTES
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // GLOBAL ERROR HANDLER
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });

  const port = config.get<number>('port');
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });