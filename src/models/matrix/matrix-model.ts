import { Client } from "pg";
import { IMatrix, IMatrixModel } from "./matrix-model-interfaces";
import { ModelNames } from "../model-interfaces";
import { getById, getMany, insertOne } from "../shared/shared-functions";
import { Logger } from "winston";

export class MatrixModel implements IMatrixModel {
	#client: Client;
	#logger: Logger;
	name: ModelNames = "matrix";

	constructor(client: Client, logger: Logger) {
		this.#client = client;
		this.#logger = logger;
	}

	async getMany(offset: number, limit: number): Promise<IMatrix[]> {
		return getMany(
			{
				table: "matrix",
				className: MatrixModel.name,
				client: this.#client,
				offset,
				limit,
			},
			this.#logger,
		);
	}

	async getByEventId(id: string): Promise<IMatrix | null> {
		return getById(
			{
				table: "matrix",
				columnId: "event_id",
				className: MatrixModel.name,
				client: this.#client,
				id,
			},
			this.#logger,
		);
	}

	async insertOne(matrix: IMatrix): Promise<void> {
		return insertOne(
			{
				client: this.#client,
				table: "matrix",
				insert: matrix,
			},
			this.#logger,
		);
	}

	async updateByEventId(
		repositoryId: string,
		eventId: string,
		newMatrix: Buffer,
	): Promise<void> {
		try {
			this.#logger.info(
				`Updating matrix for repository ID ${repositoryId}, event ID ${eventId}`,
			);
			await this.#client.query(
				"UPDATE matrix SET matrix = $1, event_id = $2 WHERE repository_id = $3",
				[newMatrix, eventId, repositoryId],
			);
			this.#logger.info("Matrix updated successfully");
		} catch (error) {
			this.#logger.error(
				`Error in ${MatrixModel.name} updateByEventId method: ${error}`,
			);
			throw error;
		}
	}

	async getByRepositoryId(repositoryId: string): Promise<IMatrix | null> {
		return getById(
			{
				table: "matrix",
				columnId: "repository_id",
				className: MatrixModel.name,
				client: this.#client,
				id: repositoryId,
			},
			this.#logger,
		);
	}
}
