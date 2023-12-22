import { Router } from "express";
import { MatrixController } from "../../../controllers/matrix/matrix-controller";
import {
	ApiKeyAuthMiddleware,
	PERMISSION_LEVELS,
} from "../../../middleware/api-key-auth/api-key-middleware-interfaces";

function createMatrixRouter(
	matrixController: MatrixController,
	apiKeyAuthMiddleware: ApiKeyAuthMiddleware,
): Router {
	return Router()
		.get(
			"/matrices",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			matrixController.getMany.bind(matrixController),
		)
		.get(
			"/matrix/:id",
			apiKeyAuthMiddleware(PERMISSION_LEVELS.READ),
			matrixController.getById.bind(matrixController),
		);
}

export { createMatrixRouter };
