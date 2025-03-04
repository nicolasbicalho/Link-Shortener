import express, { Request, Response, NextFunction } from "express";

import linkService from './link.service';
import AppError from "../utils/AppError";
import viewService from "../view/view.service";

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
});

router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { shortId } = req.query as { shortId: string };
		if (!shortId) throw new AppError('userId not found', 400);
	
		const link = await linkService.getLinkByShortId({
			shortId,
		});
		if (!link) throw new AppError('link not found', 404);

		const views = await viewService.getViewsByLink({ linkId: link.id });

		const stats = {
			earningsPerClick: link.earningsPerClick,
			totalClicks: views.length,
			totalEarnings: views.length * link.earningsPerClick,
		};
		
		res.send(stats);
	} catch (error) {
		return next(error);
	}
});

export default router;