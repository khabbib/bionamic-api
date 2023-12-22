import { postgresqlClient } from "../../shared/postgresql-client";
import { EventModel } from "./event-model";
import { IEventModel } from "./event-model-interfaces";
import { logger } from "../../shared/winston";

export const eventModel: IEventModel = new EventModel(postgresqlClient, logger);
