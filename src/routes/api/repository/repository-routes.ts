import { Router } from "express";
import { RepositoryController } from "../../../controllers/repository/repository-controller";

function createRepositoryRoutes(
	repositoryController: RepositoryController,
): Router {
	return Router()
		.get(
			"/repositories",
			repositoryController.getMany.bind(repositoryController),
		)
		.get(
			"/repository/:id",
			repositoryController.getById.bind(repositoryController),
		)
		.get(
			"/repository/count",
			repositoryController.getTotalCount.bind(repositoryController),
		);
}

export { createRepositoryRoutes };
