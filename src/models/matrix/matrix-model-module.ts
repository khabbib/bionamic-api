import { postgresqlClient } from "../../shared/postgresql-client";
import { MatrixModel } from "./matrix-model";
import { logger } from "../../shared/winston";

export const matrixModel = new MatrixModel(postgresqlClient, logger);
