import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const errorHandler = (err: Error | AppError, _req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return next();
  }
  console.error(err.stack);

  res.status(500).json({
    message: 'Internal Server Error',
  });
  return next();
};

export default errorHandler;
