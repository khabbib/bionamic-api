import { postgresqlClient } from "../../shared/postgresql-client";
import { RepositoryModel } from "./repository-model";
import { logger } from "../../shared/winston";

export const repositoryModel = new RepositoryModel(postgresqlClient, logger);
