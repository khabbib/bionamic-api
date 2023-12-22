import { Client } from "pg";
import { IFile, IFileModel } from "./file-model-interfaces";
import { ModelNames } from "../model-interfaces";
import { getById, getMany, insertOne } from "../shared/shared-functions";
import { Logger } from "winston";

export class FileModel implements IFileModel {
	#client: Client;
	#logger: Logger;
	name: ModelNames = "file";

	constructor(client: Client, logger: Logger) {
		this.#client = client;
		this.#logger = logger;
	}

	async getMany(offset: number, limit: number): Promise<IFile[]> {
		return getMany(
			{
				table: "file",
				className: FileModel.name,
				client: this.#client,
				offset,
				limit,
			},
			this.#logger,
		);
	}

	async getById(id: string): Promise<IFile | null> {
		return getById(
			{
				table: "file",
				columnId: "file_id",
				className: FileModel.name,
				client: this.#client,
				id,
			},
			this.#logger,
		);
	}

	async insertOne(file: IFile): Promise<void> {
		return insertOne(
			{
				client: this.#client,
				table: "file",
				insert: file,
			},
			this.#logger,
		);
	}
}
