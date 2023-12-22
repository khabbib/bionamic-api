import { Router } from "express";
import { FileController } from "../../../controllers/file/file-controller";
import {
	ApiKeyAuthMiddleware,
	PERMISSION_LEVELS,
} from "../../../middleware/api-key-auth/api-key-middleware-interfaces";

function createFileRoutes(
	fileController: FileController,
	apiKeyAuthMiddleware: ApiKeyAuthMiddleware,
): Router {
	return Router()
		.get(
			"/files",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			fileController.getMany.bind(fileController),
		)
		.get(
			"/file/:id",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			fileController.getById.bind(fileController),
		);
}

export { createFileRoutes };
