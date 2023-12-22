import { postgresqlClient } from "../../shared/postgresql-client";
import { UserModel } from "./user-model";
import { logger } from "../../shared/winston";

export const userModel = new UserModel(postgresqlClient, logger);
