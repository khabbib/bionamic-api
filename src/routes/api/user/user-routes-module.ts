import { userController } from "../../../controllers/user/user-controller-module";
import { apiKeyAuthMiddleware } from "../../../middleware/api-key-auth/api-key-middleware-module";
import { createUserRoutes } from "./user-routes";

export const userRoutes = createUserRoutes(
	userController,
	apiKeyAuthMiddleware,
);
