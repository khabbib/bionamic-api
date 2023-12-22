import { repositoryModel } from "../../models/repository/repository-model-module";
import { RepositoryController } from "./repository-controller";
import { logger } from "../../shared/winston";

export const repositoryController = new RepositoryController(
	repositoryModel,
	logger,
);
