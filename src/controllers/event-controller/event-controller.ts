import { Client } from "pg";
import { Response, Request } from "express";
import {
	respBadRequest,
	respInternalServerError,
	respUpdated,
} from "../shared/server-response";
import {
	EventData,
	IEventModel,
	IHandleEvent,
	IInsertEvent,
} from "../../models/event/event-model-interfaces";
import { v4 } from "uuid";
import { transaction } from "../../database/util";
import { IMatrixModel } from "../../models/matrix/matrix-model-interfaces";
import { ensureUserId } from "../../database/ensure-existance";
import { getMany, getById } from "../shared/shared-functions";
import { Logger } from "winston";

export class EventController {
	#eventModel: IEventModel;
	#matrixModel: IMatrixModel;
	#client: Client;
	#logger: Logger;

	constructor(
		eventModel: IEventModel,
		matrixModel: IMatrixModel,
		client: Client,
		logger: Logger,
	) {
		this.#eventModel = eventModel;
		this.#client = client;
		this.#matrixModel = matrixModel;
		this.#logger = logger;
	}

	async getMany(req: Request, res: Response) {
		await getMany(
			this.#eventModel.getMany.bind(this.#eventModel),
			req,
			res,
			this.#logger,
		);
	}

	async getById(req: Request, res: Response) {
		await getById(
			this.#eventModel.getById.bind(this.#eventModel),
			req,
			res,
			this.#logger,
		);
	}

	async insertOne(req: Request, res: Response) {
		const data = req.body;
		const checkData = this.#checkEventData(data);

		if (checkData.isValid) {
			try {
				await this.#handleEvent({
					...data,
					id: v4(),
				});
				const message = "Event inserted successfully!";
				this.#logger.info(message, { data });
				await respUpdated(res, message, this.#logger);
			} catch (error) {
				this.#logger.error("Error while inserting event.", { error });
				respInternalServerError(res, this.#logger);
			}
		} else {
			respBadRequest(res, checkData.message, this.#logger);
		}
	}

	async #handleEvent(event: IHandleEvent): Promise<void> {
		await transaction(this.#client, async () => {
			try {
				const hasEvent = Boolean(await this.#eventModel.getById(event.id));
				if (!hasEvent) {
					return false;
				}

				const eventToSave: IInsertEvent = {
					event_id: event.id,
					user_id: event.userId,
					repository_id: event.repositoryId,
					event_: Buffer.from(
						JSON.stringify({
							type: event.type,
							value: event.value,
						}),
					),
				};

				const isUser = await ensureUserId(event.userId, this.#client);
				if (!isUser) {
					return false;
				}

				await this.#eventModel.insertOne(eventToSave);

				switch (event.type) {
					case "increment":
						return await this.#handleIncrementAndDecrement(event, 1);
					case "decrement":
						return await this.#handleIncrementAndDecrement(event, -1);
					default:
						return false;
				}
			} catch (error) {
				this.#logger.error(`Error in handleDecrementEvent: ${error}`);
				throw new Error("Database error ");
			}
		});
	}

	async #handleIncrementAndDecrement(
		event: IHandleEvent,
		modifier: number,
	): Promise<void> {
		const matrix = await this.#matrixModel.getByRepositoryId(
			event.repositoryId,
		);

		if (matrix == null) {
			return;
		}

		const currentValue: number = JSON.parse(matrix.matrix.toString());
		const updatedValue = currentValue + modifier * event.value;
		const buffer = Buffer.from(JSON.stringify(updatedValue));

		return await this.#matrixModel.updateByEventId(
			event.repositoryId,
			event.id,
			buffer,
		);
	}

	#checkEventData(data: EventData): {
		isValid: boolean;
		message: string;
	} {
		if (!data.type || !data.repositoryId || !data.userId || !data.value) {
			const errorMessage = "Missing data in event";
			this.#logger.warn(errorMessage, { missingData: data });
			return { isValid: false, message: "Missing data" };
		}

		if (!["increment", "decrement"].includes(data.type)) {
			const errorMessage = "Invalid event type";
			this.#logger.warn(errorMessage, { invalidEventType: data.type });
			return { isValid: false, message: "Invalid event type" };
		}

		if (isNaN(data.value)) {
			const errorMessage = "Invalid value in event";
			this.#logger.warn(errorMessage, { invalidValue: data.value });
			return { isValid: false, message: "Invalid value" };
		}
		this.#logger.info("Event data is valid", { eventData: data });
		return { isValid: true, message: "Valid data" };
	}
}
