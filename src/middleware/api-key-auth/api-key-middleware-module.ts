import { apiKeyModel } from "../../models/api-key/api-key-model-module";
import { createApiKeyAuthMiddleware } from "./api-key-middleware";
import { logger } from "../../shared/winston";

export const apiKeyAuthMiddleware = createApiKeyAuthMiddleware(
	apiKeyModel,
	logger,
);
