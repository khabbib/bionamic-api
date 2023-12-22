import { apiKeyModel } from "../../models/api-key/api-key-model-module";
import { ApiKeyController } from "./api-key-controller";
import { logger } from "../../shared/winston";

export const apikeyController = new ApiKeyController(apiKeyModel, logger);
