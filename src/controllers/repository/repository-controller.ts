import { Request, Response } from "express";
import { IRepositoryModel } from "../../models/repository/repository-model-interfaces";
import { getMany, getById, getTotalCount } from "../shared/shared-functions";
import { Logger } from "winston";

export class RepositoryController {
	#model: IRepositoryModel;
	#logger: Logger;

	constructor(model: IRepositoryModel, logger: Logger) {
		this.#model = model;
		this.#logger = logger;
	}

	async getMany(req: Request, res: Response) {
		await getMany(
			this.#model.getMany.bind(this.#model),
			req,
			res,
			this.#logger,
		);
	}

	async getById(req: Request, res: Response) {
		await getById(
			this.#model.getById.bind(this.#model),
			req,
			res,
			this.#logger,
		);
	}

	async getTotalCount(req: Request, res: Response) {
		await getTotalCount(
			this.#model.getTotalCount.bind(this.#model),
			req,
			res,
			this.#logger,
		);
	}
}
