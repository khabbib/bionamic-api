import {
	respBadRequest,
	respInternalServerError,
	respNotFound,
	respOkJSON,
} from "../shared/server-response";
import { Request, Response } from "express";
import { Logger } from "winston";

export async function getMany<TEntity>(
	getMany: (offset: number, limit: number) => Promise<TEntity[]>,
	req: Request,
	res: Response,
	logger: Logger, // Your Winston Logger instance
): Promise<void> {
	const offset = parseInt(req.query["offset"] as string);
	const limit = parseInt(req.query["limit"] as string);

	if (isNaN(offset) || isNaN(limit)) {
		const message = "Invalid offset or limit";
		logger.warn(`Invalid offset or limit: offset=${offset}, limit=${limit}`);
		return respBadRequest(res, message, logger);
	}

	try {
		logger.info(`Fetching data with offset: ${offset}, limit: ${limit}`);
		const data = await getMany(offset, limit);

		if (data === null) {
			logger.info("No data found");
			return respNotFound(res, logger);
		}

		logger.info(`Successfully fetched data. Count: ${data.length}`);
		return respOkJSON(res, JSON.stringify(data), logger);
	} catch (error) {
		logger.error(`Error in getMany: ${error}`);
		console.error(error); // Log the error to the console as well, if needed
		return respInternalServerError(res, logger);
	}
}

export async function getById<TEntity>(
	getById: (id: string) => Promise<TEntity | null>,
	req: Request,
	res: Response,
	logger: Logger, // Your Winston Logger instance
): Promise<void> {
	const id = req.query["id"];
	if (typeof id !== "string") {
		const message = "Invalid id";
		logger.warn(`Invalid id: ${id}`);
		return respBadRequest(res, message, logger);
	}
	const cleanId = id.trim();

	try {
		logger.info(`Fetching data by ID: ${cleanId}`);
		const data = await getById(cleanId);

		if (data === null) {
			logger.info("No data found");
			return respNotFound(res, logger);
		}

		logger.info(`Successfully fetched data by ID: ${cleanId}`);
		return respOkJSON(res, JSON.stringify(data), logger);
	} catch (error) {
		logger.error(`Error in getById: ${error}`);
		return respInternalServerError(res, logger);
	}
}

export async function getTotalCount(
	getTotalCount: () => Promise<number>,
	_req: Request,
	res: Response,
	logger: Logger, // Your Winston Logger instance
): Promise<void> {
	try {
		logger.info("Fetching total count");
		const data = await getTotalCount();

		if (data === null) {
			logger.info("No total count data found");
			return respNotFound(res, logger);
		}

		logger.info(`Successfully fetched total count. Count: ${data}`);
		return respOkJSON(res, JSON.stringify(data), logger);
	} catch (error) {
		logger.error(`Error in getTotalCount: ${error}`);
		return respInternalServerError(res, logger);
	}
}
