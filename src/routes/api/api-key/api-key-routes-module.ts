import { apikeyController } from "../../../controllers/api-key/api-key-controller-module";
import { apiKeyAuthMiddleware } from "../../../middleware/api-key-auth/api-key-middleware-module";
import { createApiKeyRoutes } from "./api-key-routes";

export const apiKeyRoutes = createApiKeyRoutes(
	apikeyController,
	apiKeyAuthMiddleware,
);
