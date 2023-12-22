import { v4 } from "uuid";
import { Response, Request } from "express";
import { logger } from "../../shared/winston";
import { apiKeyModel } from "../../models/api-key/api-key-model-module";
import { IApiKeyModel } from "../../models/api-key/api-key-model-interfaces";
import { getMany } from "../shared/shared-functions";
import { Logger } from "winston";

class ApiKeyController {
	#model: IApiKeyModel;
	#logger: Logger;

	constructor(model: IApiKeyModel, logger: Logger) {
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

	async insertOne(req: Request, res: Response) {
		const level = Number(req.params["level"]);
		const key = v4();
		const api_id = v4();
		const expireDate = new Date();
		expireDate.setFullYear(expireDate.getFullYear() + 1);
		await this.#model.insertOne({
			api_id,
			key,
			permission_level: level,
			expires: expireDate,
		});
		logger.info("Api key created : ", apiKeyModel);
		return res.json({
			key,
		});
	}
}

export { ApiKeyController };
