import { postgresqlClient } from "../../shared/postgresql-client";
import { eventModel } from "../../models/event/event-model-module";
import { matrixModel } from "../../models/matrix/matrix-model-module";
import { EventController } from "./event-controller";
import { logger } from "../../shared/winston";

export const eventController = new EventController(
	eventModel,
	matrixModel,
	postgresqlClient,
	logger,
);
