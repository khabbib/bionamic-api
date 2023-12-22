import { Router } from "express";
import { EventController } from "../../../controllers/event-controller/event-controller";
import {
	ApiKeyAuthMiddleware,
	PERMISSION_LEVELS,
} from "../../../middleware/api-key-auth/api-key-middleware-interfaces";

function createEventRoutes(
	eventController: EventController,
	apiKeyAuthMiddleware: ApiKeyAuthMiddleware,
): Router {
	return Router()
		.get(
			"/events",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			eventController.getMany.bind(eventController),
		)
		.get(
			"/event",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			eventController.getById.bind(eventController),
		)
		.post(
			"/event",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ_WRITE),
			eventController.insertOne.bind(eventController),
		);
}

export { createEventRoutes };
