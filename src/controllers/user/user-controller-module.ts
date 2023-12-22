import { userModel } from "../../models/user/user-model-module";
import { UserController } from "./user-controller";
import { logger } from "../../shared/winston";

export const userController = new UserController(userModel, logger);
