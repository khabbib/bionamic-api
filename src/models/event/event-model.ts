import { Client } from "pg";
import { IEvent, IEventModel, IInsertEvent } from "./event-model-interfaces";
import { ModelNames } from "../model-interfaces";
import { getById, getMany } from "../shared/shared-functions";
import { Logger } from "winston";

export class EventModel implements IEventModel {
	#client: Client;
	#logger: Logger;
	name: ModelNames = "event";

	constructor(client: Client, logger: Logger) {
		this.#client = client;
		this.#logger = logger;
	}

	async getMany(offset: number, limit: number): Promise<IEvent[]> {
		return getMany(
			{
				table: "event",
				className: EventModel.name,
				client: this.#client,
				offset,
				limit,
			},
			this.#logger,
		);
	}

	async getById(id: string): Promise<IEvent | null> {
		return getById(
			{
				table: "event",
				columnId: "event_id",
				className: EventModel.name,
				client: this.#client,
				id,
			},
			this.#logger,
		);
	}

	// This function does extra calculation, no need to be replaced with the shared function
	async insertOne(event: IInsertEvent): Promise<void> {
		try {
			const countEventsInRepository = `
                SELECT COUNT(*)
                FROM event
                WHERE repository_id = $1`;
			const query = `
                INSERT INTO event(event_id, time, user_id, event_, repository_id, index)
                VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (event_id) DO NOTHING;`;

			this.#logger.info(`Inserting event with ID: ${event.event_id}`);

			const result = await this.#client.query(countEventsInRepository, [
				event.repository_id,
			]);

			await this.#client.query(query, [
				event.event_id,
				new Date(),
				event.user_id,
				event.event_,
				event.repository_id,
				result.rowCount,
			]);

			this.#logger.info("Event inserted successfully");
		} catch (error) {
			this.#logger.error(
				`Error in ${EventModel.name} insertOne method: ${error}`,
			);
			throw error;
		}
	}
}
