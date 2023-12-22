import { eventController } from "../../../controllers/event-controller/event-controller-module";
import { apiKeyAuthMiddleware } from "../../../middleware/api-key-auth/api-key-middleware-module";
import { createEventRoutes } from "./event-routes";

export const eventRoutes = createEventRoutes(
	eventController,
	apiKeyAuthMiddleware,
);
