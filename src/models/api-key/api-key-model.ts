import { Client } from "pg";
import { type IApiKey, type IApiKeyModel } from "./api-key-model-interfaces";
import { getById, getMany, insertOne } from "../shared/shared-functions";
import { Logger } from "winston";

class ApiKeyModel implements IApiKeyModel {
	#client: Client;
	#logger: Logger;

	constructor(client: Client, logger: Logger) {
		this.#client = client;
		this.#logger = logger;
	}

	async insertOne(apiKey: IApiKey): Promise<void> {
		await insertOne(
			{
				client: this.#client,
				table: "api_key",
				insert: apiKey,
			},
			this.#logger,
		);
	}

	async getById(id: string): Promise<IApiKey | null> {
		return getById<IApiKey>(
			{
				table: "api_key",
				columnId: "key",
				className: ApiKeyModel.name,
				client: this.#client,
				id,
			},
			this.#logger,
		);
	}

	async getMany(offset: number, limit: number): Promise<IApiKey[]> {
		return await getMany(
			{
				table: "api_key",
				className: ApiKeyModel.name,
				client: this.#client,
				offset,
				limit,
			},
			this.#logger,
		);
	}
}

export { ApiKeyModel };
