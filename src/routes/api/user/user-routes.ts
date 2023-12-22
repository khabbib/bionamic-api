import { Router } from "express";
import { UserController } from "../../../controllers/user/user-controller";
import {
	ApiKeyAuthMiddleware,
	PERMISSION_LEVELS,
} from "../../../middleware/api-key-auth/api-key-middleware-interfaces";

function createUserRoutes(
	userController: UserController,
	apiKeyAuthMiddleware: ApiKeyAuthMiddleware,
): Router {
	return Router()
		.get(
			"/users",
			// apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			userController.getMany.bind(userController),
		)
		.get(
			"/user/:id",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			userController.getById.bind(userController),
		)
		.get(
			"/users/count",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			userController.getTotalCount.bind(userController),
		);
}

export { createUserRoutes };
