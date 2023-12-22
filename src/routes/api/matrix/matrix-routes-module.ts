import { matrixController } from "../../../controllers/matrix/matrix-controller-module";
import { apiKeyAuthMiddleware } from "../../../middleware/api-key-auth/api-key-middleware-module";
import { createMatrixRouter } from "./matrix-routes";

export const matrixRoutes = createMatrixRouter(
	matrixController,
	apiKeyAuthMiddleware,
);
