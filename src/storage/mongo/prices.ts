import { PricesRepo } from "../repo/prices";
import Prices, { IPrices } from "../../models/Prices";
import { logger } from "../../config/logger";
import AppError from "../../utils/appError";

export class PricesStorage implements PricesRepo {
	private scope = "storage.prices";

	async find(query: Object): Promise<IPrices[]> {
		try {
			return await Prices.find(query).select("-__v");
		} catch (error) {
			logger.error(`${this.scope}.find: finished with error: ${error}`);
			throw error;
		}
	}

	async findOne(query: Object): Promise<IPrices> {
		try {
			const prices = await Prices.findOne(query).select("-__v");

			if (!prices) {
				logger.warn(`${this.scope}.get failed to findOne`);
				throw new AppError(404, "Prices is not found");
			}

			return prices;
		} catch (error) {
			logger.error(`${this.scope}.findOne: finished with error: ${error}`);
			throw error;
		}
	}

	async create(payload: IPrices): Promise<IPrices> {
		try {
			return await Prices.create(payload);
		} catch (error) {
			logger.error(`${this.scope}.create: finished with error: ${error}`);
			throw error;
		}
	}

	async insertMany(payload: IPrices): Promise<IPrices> {
		try {
			return await Prices.insertMany(payload);
		} catch (error) {
			logger.error(`${this.scope}.create: finished with error: ${error}`);
			throw error;
		}
	}

	async update(query: object, payload: IPrices): Promise<IPrices> {
		try {
			const prices = await Prices.findOneAndUpdate(query, payload, {
				new: true
			}).select("-__v");

			if (!prices) {
				logger.warn(`${this.scope}.update failed to findOneAndUpdate`);
				throw new AppError(404, "Prices is not found");
			}

			return prices;
		} catch (error) {
			logger.error(`${this.scope}.update: finished with error: ${error}`);
			throw error;
		}
	}

	async delete(query: object): Promise<IPrices> {
		try {
			const prices = await Prices.findOneAndDelete(query).select("-__v");

			if (!prices) {
				logger.warn(`${this.scope}.delete failed to findOneAndDelete`);
				throw new AppError(404, "Prices is not found");
			}

			return prices;
		} catch (error) {
			logger.error(`${this.scope}.delete: finished with error: ${error}`);
			throw error;
		}
	}
}
