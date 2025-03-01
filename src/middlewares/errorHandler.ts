import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const errorHandler = (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err.stack);

  res.status(500).json({
    message: 'Internal Server Error',
  });
};

export default errorHandler;
