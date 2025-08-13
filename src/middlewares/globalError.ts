import type { NextFunction, Request, Response } from "express";
import type AppError from "../lib/appError.ts";

const globalError = (
	err: AppError,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "production" && err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}

	return res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
	});
};

export default globalError;
