import { Client } from "pg";
import { IUser, IUserModel } from "./user-model-interfaces";
import { ModelNames } from "../model-interfaces";
import {
	getMany,
	getById,
	getTotalCount,
	insertOne,
} from "../shared/shared-functions";
import { Logger } from "winston";

class UserModel implements IUserModel {
	#client: Client;
	#logger: Logger;
	name: ModelNames = "user";

	constructor(client: Client, logger: Logger) {
		this.#logger = logger;
		this.#client = client;
	}

	async getMany(offset: number, limit: number): Promise<IUser[]> {
		try {
			this.#logger.info(
				`Fetching users with offset: ${offset}, limit: ${limit}`,
			);
			const result = (await getMany(
				{
					table: "bionamic_user",
					className: UserModel.name,
					client: this.#client,
					offset,
					limit,
				},
				this.#logger,
			)) as IUser[];
			this.#logger.info(`Successfully fetched ${result.length} users`);
			return result;
		} catch (error) {
			this.#logger.error(`Error fetching users: ${error}`);
			throw error;
		}
	}

	async getById(id: string): Promise<IUser | null> {
		try {
			this.#logger.info(`Fetching user with ID: ${id}`);
			const result = (await getById(
				{
					table: "bionamic_user",
					columnId: "user_id",
					className: UserModel.name,
					client: this.#client,
					id,
				},
				this.#logger,
			)) as IUser | null; // Cast the result to IUser | null if necessary

			if (result) {
				this.#logger.info(`Successfully fetched user with ID: ${id}`);
			} else {
				this.#logger.warn(`User with ID ${id} not found`);
			}

			return result;
		} catch (error) {
			this.#logger.error(`Error fetching user with ID ${id}: ${error}`);
			throw error;
		}
	}

	async getTotalCount(): Promise<number> {
		try {
			this.#logger.info("Fetching total user count");
			const result = await getTotalCount(
				{
					table: "bionamic_user",
					className: UserModel.name,
					client: this.#client,
				},
				this.#logger,
			);

			this.#logger.info(`Successfully fetched total user count: ${result}`);
			return result;
		} catch (error) {
			this.#logger.error(`Error fetching total user count: ${error}`);
			throw error;
		}
	}

	async insertOne(user: IUser): Promise<void> {
		try {
			this.#logger.info(`Inserting user: ${JSON.stringify(user)}`);
			await insertOne(
				{
					client: this.#client,
					table: "bionamic_user",
					insert: user,
				},
				this.#logger,
			);
			this.#logger.info("User inserted successfully");
		} catch (error) {
			this.#logger.error(`Error inserting user: ${error}`);
			throw error;
		}
	}
}

export { UserModel };
