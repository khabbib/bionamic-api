import { Response } from "express";
import { CONFIG } from "../../shared/config";
import { Logger } from "winston";

function respOk(res: Response, data: string, logger: Logger) {
	const headers = {
		serverName: CONFIG.SERVER.SERVER_NAME,
	};

	logger.info("Sending OK response");
	res.writeHead(200, headers);
	res.end(data);
}

async function respOkJSON(res: Response, data: string, logger: Logger | null) {
	const headers = {
		serverName: CONFIG.SERVER.SERVER_NAME,
		"Content-Type": "application/json",
	};

	logger?.info("Sending OK JSON response");
	res.writeHead(200, headers);
	res.end(data);
}

async function respUpdated(res: Response, message: string, logger: Logger) {
	const headers = {
		serverName: CONFIG.SERVER.SERVER_NAME,
		"Content-Type": "application/json",
	};

	logger.info("Sending Updated response");
	res.writeHead(201, headers);
	res.end(JSON.stringify({ message }));
}

function respNotModified(res: Response, logger: Logger) {
	logger.info("Sending Not Modified response");
	res.writeHead(304, {
		serverName: CONFIG.SERVER.SERVER_NAME,
	});
	res.end();
}

function respNotFound(res: Response, logger: Logger) {
	logger.info("Sending Not Found response");
	res.writeHead(404, {
		serverName: CONFIG.SERVER.SERVER_NAME,
	});
	res.end(JSON.stringify("Not found"));
}

function respBadRequest(res: Response, message: string, logger: Logger) {
	logger.warn(`Sending Bad Request response: ${message}`);
	res.writeHead(400, {
		serverName: CONFIG.SERVER.SERVER_NAME,
	});
	res.end(JSON.stringify(message));
}

function respUnauthorized(res: Response, logger: Logger) {
	logger.warn("Sending Unauthorized response");
	res.writeHead(401, {
		serverName: CONFIG.SERVER.SERVER_NAME,
	});
	res.end();
}

function respInternalServerError(res: Response, logger: Logger | null) {
	logger?.error("Sending Internal Server Error response");
	res.writeHead(500, {
		serverName: CONFIG.SERVER.SERVER_NAME,
	});
	res.end("Internal Server Error");
}

export {
	respOk,
	respOkJSON,
	respNotModified,
	respUpdated,
	respNotFound,
	respBadRequest,
	respUnauthorized,
	respInternalServerError,
};
