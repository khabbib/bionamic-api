import { fileController } from "../../../controllers/file/file-controller-module";
import { apiKeyAuthMiddleware } from "../../../middleware/api-key-auth/api-key-middleware-module";
import { createFileRoutes } from "./file-routes";

export const fileRoutes = createFileRoutes(
	fileController,
	apiKeyAuthMiddleware,
);
