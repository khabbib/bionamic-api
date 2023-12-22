import { Router } from "express";
import { ApiKeyController } from "../../../controllers/api-key/api-key-controller";
import {
	ApiKeyAuthMiddleware,
	// PERMISSION_LEVELS,
} from "../../../middleware/api-key-auth/api-key-middleware-interfaces";

function createApiKeyRoutes(
	apiKeyController: ApiKeyController,
	_apiKeyAuthMiddleware: ApiKeyAuthMiddleware,
): Router {
	return Router()

		.get(
			"/api-keys",
			// apiKeyAuthMiddleware(PERMISSION_LEVELS.ADMIN),
			apiKeyController.getMany.bind(apiKeyController),
		)
		.post(
			"/api-key/:level",
			// apiKeyAuthMiddleware(PERMISSION_LEVELS.ADMIN),
			apiKeyController.insertOne.bind(apiKeyController),
		);
}

export { createApiKeyRoutes };
