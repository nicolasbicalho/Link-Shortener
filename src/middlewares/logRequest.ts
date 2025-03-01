import { Request, Response, NextFunction } from "express";

const logRequest = (req: Request, _res: Response, next: NextFunction) => {
	console.log('=================================================================');
		const loggedBody = { ...req.body };

		console.log('body', JSON.stringify(loggedBody).substring(0, 2000));
		console.log('query', JSON.stringify(req.query).substring(0, 400));
  return next();
};

export default logRequest;
