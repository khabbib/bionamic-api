import { Request, Response } from "express";
import { IFileModel } from "../../models/file/file-model-interfaces";
import { getMany, getById } from "../shared/shared-functions";
import { Logger } from "winston";

export class FileController {
	#model: IFileModel;
	#logger: Logger;

	constructor(model: IFileModel, logger: Logger) {
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
}
