import express, { Request, Response } from 'express';
import userRoutes from './user/user.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.use(errorHandler);

export default app;