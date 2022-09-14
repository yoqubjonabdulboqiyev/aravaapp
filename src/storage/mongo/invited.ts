import { InvitedRepo } from "../repo/invited";
import Invited, { IInvited } from "../../models/Invited";
import { logger } from "../../config/logger";
import AppError from "../../utils/appError";

export class InvitedStorage implements InvitedRepo {
	private scope = "storage.invited";

	async find(query: Object, page: number): Promise<IInvited[]> {
		try {
			return await Invited.find(query)
				.limit(20)
				.skip(page * 20)
				.select("-__v");
		} catch (error) {
			logger.error(`${this.scope}.find: finished with error: ${error}`);
			throw error;
		}
	}

	async findOne(query: Object): Promise<IInvited> {
		try {
			const invited = await Invited.findOne(query).select("-__v");

			if (!invited) {
				logger.warn(`${this.scope}.get failed to findOne`);
				throw new AppError(404, "Invited is not found");
			}

			return invited;
		} catch (error) {
			logger.error(`${this.scope}.findOne: finished with error: ${error}`);
			throw error;
		}
	}

	async create(payload: IInvited): Promise<IInvited> {
		try {
			return await Invited.create(payload);
		} catch (error) {
			logger.error(`${this.scope}.create: finished with error: ${error}`);
			throw error;
		}
	}

	async update(query: object, payload: IInvited | Object): Promise<IInvited> {
		try {
			const invited = await Invited.findOneAndUpdate(query, payload, { new: true }).select(
				"-__v"
			);

			if (!invited) {
				logger.warn(`${this.scope}.update failed to findOneAndUpdate`);
				throw new AppError(404, "Invited is not found");
			}

			return invited;
		} catch (error) {
			logger.error(`${this.scope}.update: finished with error: ${error}`);
			throw error;
		}
	}

	async delete(query: object): Promise<IInvited> {
		try {
			const invited = await Invited.findOneAndDelete(query).select("-__v");

			if (!invited) {
				logger.warn(`${this.scope}.delete failed to findOneAndDelete`);
				throw new AppError(404, "Invited is not found");
			}

			return invited;
		} catch (error) {
			logger.error(`${this.scope}.delete: finished with error: ${error}`);
			throw error;
		}
	}

	async deleteMany(query: Object): Promise<Object> {
		try {
			return await Invited.deleteMany(query);
		} catch (error) {
			logger.error(`${this.scope}.delete: finished with error: ${error}`);
			throw error;
		}
	}

	async pageNumber(query: Object): Promise<number> {
		try {
			return Invited.countDocuments(query);
		} catch (error) {
			logger.error(`${this.scope}.find: finished with error: ${error}`);
			throw error;
		}
	}
}
