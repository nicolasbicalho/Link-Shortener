import express, { Request, Response, NextFunction } from "express";

// import userService from './user.service';
import AppError from "../utils/AppError";
import linkService from "../link/link.service";
import userService from "../user/user.service";

const router = express.Router();

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body;
		if (!username) throw new AppError('username not found', 400);
		if (!password) throw new AppError('password not found', 400);
	
		const user = await userService.createUser({ username, password });
		
		res.send(user);
	} catch (error) {
		return next(error);
	}
});

router.get('/links', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.body;
		if (!userId) throw new AppError('userId not found', 400);
	
		const links = await linkService.getUserLinks({ userId });
		
		res.send(links);
	} catch (error) {
		return next(error);
	}
})

export default router;