import { repositoryController } from "../../../controllers/repository/repository-controller-module";
import { createRepositoryRoutes } from "./repository-routes";

export const repositoryRoutes = createRepositoryRoutes(repositoryController);
