import { generateFakeData } from "./util";
import { repositoryModel } from "../models/repository/repository-model-module";
import { userModel } from "../models/user/user-model-module";
import { eventModel } from "../models/event/event-model-module";
import { matrixModel } from "../models/matrix/matrix-model-module";
import { fileModel } from "../models/file/file-model-module";
import { apiKeyModel } from "../models/api-key/api-key-model-module";
import { postgresqlClient } from "../shared/postgresql-client";
import { schema } from "./schema";
import { logger } from "../shared/winston";

export async function createSchema(): Promise<void> {
	try {
		logger.info("Creating schema");
		await postgresqlClient.query(schema);
		logger.info("Schema created successfully");
	} catch (error: unknown) {
		logger.error(`Error creating schema: ${error}`);
		throw error;
	}
}

export async function insertData(): Promise<void> {
	const {
		fakeRepository,
		fakeUser,
		fakeEvent,
		fakeMatrixData,
		fakeFile,
		fakeApiKey,
	} = generateFakeData();

	try {
		await repositoryModel.insertOne(fakeRepository);
		await userModel.insertOne(fakeUser);
		await eventModel.insertOne(fakeEvent);
		await matrixModel.insertOne(fakeMatrixData);
		await fileModel.insertOne(fakeFile);
		await apiKeyModel.insertOne(fakeApiKey);
	} catch (error) {
		logger.error("Error in insertData: ", error);
		throw error;
	}
}
