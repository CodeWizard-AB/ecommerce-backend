import type { NextFunction, Request, Response } from "express";

type AsyncController = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<any>;

const catchAsync = (fn: AsyncController) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

export default catchAsync;
