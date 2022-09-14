import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";
import { storage } from "../storage/main";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export class SampleController {
	getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const samples = await storage.sample.find(req.query);

		res.status(200).json({
			success: true,
			data: {
				samples
			}
		});
	});

	getOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const sample = await storage.sample.findOne({ _id: req.params.id });

		res.status(200).json({
			success: true,
			data: {
				sample
			}
		});
	});

	create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const sample = await storage.sample.create(req.body);

		res.status(201).json({
			success: true,
			data: {
				sample
			}
		});
	});

	update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const sample = await storage.sample.update({ _id: req.params.id }, req.body);

		res.status(200).json({
			success: true,
			data: {
				sample
			}
		});
	});

	delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		await storage.sample.delete({ _id: req.params.id });

		const samples = await storage.sample.find(req.query);

		res.status(200).json({
			success: true,
			data: {
				samples
			}
		});
	});
}
