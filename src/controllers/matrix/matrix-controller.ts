import { Request, Response } from "express";
import { IMatrixModel } from "../../models/matrix/matrix-model-interfaces";
import { getMany, getById } from "../shared/shared-functions";
import { Logger } from "winston";

export class MatrixController {
	#model: IMatrixModel;
	#logger: Logger;

	constructor(model: IMatrixModel, logger: Logger) {
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
			this.#model.getByEventId.bind(this.#model),
			req,
			res,
			this.#logger,
		);
	}
}
