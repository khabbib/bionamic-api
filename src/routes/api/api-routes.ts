import { Router } from "express";
import { apiKeyRoutes } from "./api-key/api-key-routes-module";
import { eventRoutes } from "./event/event-routes-module";
import { fileRoutes } from "./file/file-routes-module";
import { matrixRoutes } from "./matrix/matrix-routes-module";
import { repositoryRoutes } from "./repository/repository-routes-module";
import { userRoutes } from "./user/user-routes-module";

export const apiRoutes = Router()
	.use(apiKeyRoutes)
	.use(eventRoutes)
	.use(matrixRoutes)
	.use(repositoryRoutes)
	.use(userRoutes)
	.use(fileRoutes);
