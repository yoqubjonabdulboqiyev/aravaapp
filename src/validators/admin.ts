import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export class AdminValidator {
	keys = {
		required: "required",
		optional: "optional"
	};

	createSchema = Joi.object({
		first_name: Joi.string().required().min(3).max(25),
		last_name: Joi.string().required().min(3).max(25),
		profession: Joi.string(),
		phone_number: Joi.number().required().min(998000000000).max(998999999999),
		password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,20}$")).required().min(8),
		role: Joi.object().pattern(
			/.*/,
			Joi.object().keys({
				get: Joi.boolean().valid(true),
				create: Joi.boolean().valid(true),
				update: Joi.boolean().valid(true),
				delete: Joi.boolean().valid(true)
			})
		)
	});

	updateSchema = Joi.object({
		first_name: Joi.string().min(3).max(25),
		last_name: Joi.string().min(3).max(25),
		profession: Joi.string(),
		phone_number: Joi.number().min(998000000000).max(998999999999),
		password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,20}$")).min(8),
		new_password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,20}$")).min(8),
		image: Joi.string().allow(""),
		role: Joi.object().pattern(
			/.*/,
			Joi.object().keys({
				get: Joi.boolean().valid(true),
				create: Joi.boolean().valid(true),
				update: Joi.boolean().valid(true),
				delete: Joi.boolean().valid(true)
			})
		)
	});

	loginSchema = Joi.object({
		phone_number: Joi.number().required().min(998000000000).max(998999999999),
		password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,20}$")).required().min(8)
	});

	forgetPasswordSchema = Joi.object({
		password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,20}$")).required().min(8)
	});

	create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { role } = req.body;

		if (role) req.body.role = JSON.parse(role);

		const { error } = this.createSchema.validate(req.body);
		if (error) return next(error);

		next();
	});

	update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { role } = req.body;

		if (role) req.body.role = JSON.parse(role);

		const { error } = this.updateSchema.validate(req.body);
		if (error) return next(error);

		next();
	});

	login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { error } = this.loginSchema.validate(req.body);
		if (error) return next(error);

		next();
	});

	forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const { error } = this.forgetPasswordSchema.validate(req.body);
		if (error) return next(error);

		next();
	});
}
