import { Request, Response } from "express";
import { IUserModel } from "../../models/user/user-model-interfaces";
import { getMany, getById, getTotalCount } from "../shared/shared-functions";
import { Logger } from "winston";

export class UserController {
	#model: IUserModel;
	#logger: Logger;

	constructor(model: IUserModel, logger: Logger) {
		this.#model = model;
		this.#logger = logger;
	}

	async getMany(req: Request, res: Response) {
		try {
			this.#logger.info("Handling getMany request");
			await getMany(
				this.#model.getMany.bind(this.#model),
				req,
				res,
				this.#logger,
			);
			this.#logger.info("getMany request handled successfully");
		} catch (error) {
			this.#logger.error(`Error handling getMany request: ${error}`);
			res.status(500).send("Internal Server Error");
		}
	}

	async getById(req: Request, res: Response) {
		try {
			this.#logger.info("Handling getById request");
			await getById(
				this.#model.getById.bind(this.#model),
				req,
				res,
				this.#logger,
			);
			this.#logger.info("getById request handled successfully");
		} catch (error) {
			this.#logger.error(`Error handling getById request: ${error}`);
			res.status(500).send("Internal Server Error");
		}
	}

	async getTotalCount(req: Request, res: Response) {
		try {
			this.#logger.info("Handling getTotalCount request");
			await getTotalCount(
				this.#model.getTotalCount.bind(this.#model),
				req,
				res,
				this.#logger,
			);
			this.#logger.info("getTotalCount request handled successfully");
		} catch (error) {
			this.#logger.error(`Error handling getTotalCount request: ${error}`);
			res.status(500).send("Internal Server Error");
		}
	}
}
