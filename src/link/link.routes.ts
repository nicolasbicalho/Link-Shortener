import express, { Request, Response, NextFunction } from "express";

import linkService from './link.service';
import AppError from "../utils/AppError";

const router = express.Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId, originalUrl } = req.body;

		if (!userId) throw new AppError('userId not found', 400);
		if (!originalUrl) throw new AppError('originalUrl not found', 400);
	
		const link = await linkService.generateShortLink({
			originalUrl,
			userId,
		});
		
		res.send(link);
	} catch (error) {
		return next(error);
	}
})

export default router;