import { Client } from "pg";
import { IRepository, IRepositoryModel } from "./repository-model-interfaces";
import { ModelNames } from "../model-interfaces";
import {
	getById,
	getMany,
	getTotalCount,
	insertOne,
} from "../shared/shared-functions";
import { Logger } from "winston";

class RepositoryModel implements IRepositoryModel {
	#client: Client;
	#logger: Logger;
	name: ModelNames = "repository";

	constructor(client: Client, logger: Logger) {
		this.#client = client;
		this.#logger = logger;
	}

	async getById(id: string): Promise<IRepository | null> {
		return getById(
			{
				table: "matrix",
				columnId: "repository_id",
				className: RepositoryModel.name,
				client: this.#client,
				id: id,
			},
			this.#logger,
		);
	}

	async insertOne(repository: IRepository): Promise<void> {
		return insertOne(
			{
				client: this.#client,
				table: "repository",
				insert: repository,
			},
			this.#logger,
		);
	}

	async getMany(offset: number, limit: number): Promise<IRepository[]> {
		return getMany(
			{
				table: "repository",
				className: RepositoryModel.name,
				client: this.#client,
				offset,
				limit,
			},
			this.#logger,
		);
	}

	async getTotalCount(): Promise<number> {
		return getTotalCount(
			{
				table: "repository",
				className: RepositoryModel.name,
				client: this.#client,
			},
			this.#logger,
		);
	}
}

export { RepositoryModel };
