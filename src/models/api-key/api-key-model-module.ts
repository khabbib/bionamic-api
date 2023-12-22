import { postgresqlClient } from "../../shared/postgresql-client";
import { ApiKeyModel } from "./api-key-model";
import { IApiKeyModel } from "./api-key-model-interfaces";
import { logger } from "../../shared/winston";

export const apiKeyModel: IApiKeyModel = new ApiKeyModel(
	postgresqlClient,
	logger,
);
