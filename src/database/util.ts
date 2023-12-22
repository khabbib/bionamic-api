import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { Client } from "pg";

import { IApiKey } from "../models/api-key/api-key-model-interfaces";
import { IInsertEvent } from "../models/event/event-model-interfaces";
import { IFile } from "../models/file/file-model-interfaces";
import { IMatrix } from "../models/matrix/matrix-model-interfaces";
import { IRepository } from "../models/repository/repository-model-interfaces";
import { IUser } from "../models/user/user-model-interfaces";

async function transaction<IReturn>(
	client: Client,
	callBackFunction: () => Promise<IReturn>,
): Promise<IReturn> {
	try {
		await client.query("BEGIN");
		const value = await callBackFunction();
		await client.query("COMMIT");
		return value;
	} catch (error: unknown) {
		await client.query("ROLLBACK");
		throw error;
	}
}

function generateFakeData(): {
	fakeUser: IUser;
	fakeEvent: IInsertEvent;
	fakeFile: IFile;
	fakeRepository: IRepository;
	fakeMatrixData: IMatrix;
	fakeApiKey: IApiKey;
} {
	const randomUserId = faker.number.int().toString();
	const randomName = faker.person.fullName();
	const randomEmail = faker.internet.email();
	const randomRepositoryId = faker.number.int().toString();
	const randomRepositoryName = faker.lorem.word();
	const randomEventId = faker.number.int().toString();
	const randomApiId = randomUUID().toString();
	const randomApiKey = randomUUID().toString();
	const randomMatrixNumber = faker.number.int({ min: 1, max: 50 });

	const fakeUser: IUser = {
		user_id: randomUserId,
		email: randomEmail,
		name: randomName,
		permission: 1,
		status: 1,
	};

	const fakeEvent: IInsertEvent = {
		event_id: randomEventId,
		user_id: randomUserId,
		event_: Buffer.from("data"),
		repository_id: randomRepositoryId,
	};

	const fakeFile: IFile = {
		file_id: randomUUID().toString(),
		date: new Date(),
		size: 256,
		content: Buffer.from("someFile"),
		content_type: "text",
	};

	const fakeRepository: IRepository = {
		repository_id: randomRepositoryId,
		name: randomRepositoryName,
		status: 1,
	};

	const fakeMatrixData: IMatrix = {
		item_count: 10,
		matrix: Buffer.from(JSON.stringify(randomMatrixNumber)),
		repository_id: randomRepositoryId,
		event_id: randomEventId,
	};

	const fakeApiKey: IApiKey = {
		api_id: randomApiId,
		key: randomApiKey,
		permission_level: 27,
		expires: new Date(),
	};

	return {
		fakeUser,
		fakeEvent,
		fakeFile,
		fakeRepository,
		fakeMatrixData,
		fakeApiKey,
	};
}

export { generateFakeData, transaction };
