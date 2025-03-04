import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler';
import logRequest from './middlewares/logRequest';

import userRoutes from './user/user.routes';
import linkRoutes from './link/link.routes';

import AppError from './utils/AppError';
import linkService from './link/link.service';
import viewService from './view/view.service';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(logRequest);

app.use('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('ok');
});

app.use('/user', userRoutes);
app.use('/link', linkRoutes);

app.get('/:shortId', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { shortId } = req.params;
		if (!shortId) throw new AppError('shortId not found', 400);
	
		const shortLink = await linkService.getLinkByShortId({
			shortId,
		});
		if (!shortLink?.originalUrl) throw new AppError('Not Found', 404);

		await viewService.registerView({ link: shortLink });
		
		res.redirect(shortLink.originalUrl);
	} catch (error) {
		return next(error);
	}
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.use(errorHandler);

export default app;