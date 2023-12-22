// import { Client } from "pg";
// import * as dotenv from "dotenv";
// dotenv.config();

// const host = process.env["HOST"];
// const port = Number(process.env["PORT"]);
// const user = process.env["USER_"];
// const database = process.env["DATABASE"];
// const password = process.env["PASSWORD"];
// import assert from "node:assert";
// import {
// 	after,
// 	afterEach,
// 	before,
// 	beforeEach,
// 	describe,
// 	test,
// } from "node:test";
// import {
// 	IApiKey,
// 	IBionamicUser,
// 	IFile,
// 	IInsertEvent,
// 	IMatrix,
// 	IRepository,
// } from "../../database/interfaces";
// import { DatabaseInteraction } from "../../database/database-interaction";
// import { Database } from "../../database/database";
// import { DatabaseExtraction } from "database/database-extraction";

// describe("Testing populate database functionality", () => {
// 	let client: Client;
// 	let database_: Database;
// 	let databaseInteraction: DatabaseInteraction;
// 	const DB_NAME = "test_db";
// 	before(async () => {
// 		client = new Client({
// 			host,
// 			port,
// 			user,
// 			database,
// 			password,
// 		});
// 		database_ = new Database(client);
// 		databaseInteraction = new DatabaseInteraction(
// 			client,
// 			new DatabaseExtraction(client),
// 		);
// 		database_ = new Database(client);
// 		await client.connect();
// 	});
// 	beforeEach(async () => {
// 		await client.query("CREATE DATABASE $1;", [DB_NAME]);
// 		await database_.createSchema();
// 	});
// 	afterEach(async () => {
// 		await client.query("DROP DATABASE $1;", [DB_NAME]);
// 	});
// 	after(async () => {
// 		await client.end();
// 	});

// 	describe("insertUser", () => {
// 		test("Should not throw error when successful", async () => {
// 			const account: IBionamicUser = {
// 				user_id: "testsson123",
// 				email: "test@test.com",
// 				name: "testsson",
// 				permission: 1,
// 				status: 1,
// 			};
// 			await assert.doesNotReject(() => databaseInteraction.insertUser(account));
// 		});
// 		test("Should save successfully to DB", async () => {
// 			const expected: IBionamicUser = {
// 				user_id: "testsson123",
// 				email: "test@test.com",
// 				name: "testsson",
// 				permission: 1,
// 				status: 1,
// 			};
// 			await databaseInteraction.insertUser(expected);
// 			const fetchedData = await client.query("SELECT * FROM user_;");
// 			const data = fetchedData.rows[0];
// 			assert.deepStrictEqual(data, expected);
// 		});
// 		test("Should return true after successful insert", async () => {
// 			const account: IBionamicUser = {
// 				user_id: "testsson123",
// 				email: "test@test.com",
// 				name: "testsson",
// 				permission: 1,
// 				status: 1,
// 			};
// 			const isSuccessful = await databaseInteraction.insertUser(account);
// 			await assert.equal(isSuccessful, true);
// 		});
// 	});

// 	describe("insertEvent", () => {
// 		const account: IBionamicUser = {
// 			user_id: "testsson123",
// 			email: "test@test.com",
// 			name: "testsson",
// 			permission: 1,
// 			status: 1,
// 		};
// 		const repository: IRepository = {
// 			repository_id: "haskdajksd",
// 			name: "svens repo",
// 			status: 1,
// 		};
// 		const event: IInsertEvent = {
// 			event_id: "h23HG4",
// 			user_id: account.user_id,
// 			event_: Buffer.from("100110110"),
// 			repository_id: repository.repository_id,
// 		};
// 		test("Should not throw error when successful", async () => {
// 			await databaseInteraction.insertRepository(repository);
// 			await databaseInteraction.insertUser(account);
// 			await assert.doesNotReject(() => databaseInteraction.insertEvent(event));
// 		});
// 		test("Should save successfully to database", async () => {
// 			await databaseInteraction.insertRepository(repository);
// 			await databaseInteraction.insertUser(account);
// 			const fetchedData = await client.query("SELECT * FROM event;");
// 			const data = fetchedData.rows[0];
// 			assert.deepStrictEqual(data, event);
// 		});
// 		test("Should return true after successful insertion", async () => {
// 			const isSuccessful = await databaseInteraction.insertEvent(event);
// 			await assert.equal(isSuccessful, true);
// 		});
// 	});
// 	describe("insertFile", () => {
// 		const currentDate = new Date("2023-10-18");
// 		const file: IFile = {
// 			file_id: "hej123",
// 			date: currentDate,
// 			size: 123,
// 			content: Buffer.from("101010101"),
// 			content_type: "text",
// 		};
// 		test("Should not throw error when succesful", async () => {
// 			await assert.doesNotReject(() => databaseInteraction.insertFile(file));
// 		});
// 		test("Should save successfully to DB", async () => {
// 			const fetchedData = await client.query("SELECT * FROM file;");
// 			const data = fetchedData.rows[0];
// 			assert.deepStrictEqual(data, file);
// 		});
// 		test("Should return true after succesful insert", async () => {
// 			const isSuccessful = await databaseInteraction.insertFile(file);
// 			await assert.equal(isSuccessful, true);
// 		});
// 	});
// 	describe("insertRepository", () => {
// 		const repo: IRepository = {
// 			repository_id: "asd123",
// 			name: "Williams härliga repo",
// 			status: 1,
// 		};
// 		test("Should not throw error when successful", async () => {
// 			await assert.doesNotReject(() =>
// 				databaseInteraction.insertRepository(repo),
// 			);
// 		});
// 		test("Should save successfully to database", async () => {
// 			await databaseInteraction.insertRepository(repo);
// 			const fetchedData = await client.query("SELECT * FROM repository;");
// 			const data = fetchedData.rows[0];
// 			assert.deepStrictEqual(data, repo);
// 		});
// 		test("Should return true after successful insert", async () => {
// 			const isSuccessful = await databaseInteraction.insertRepository(repo);
// 			await assert.equal(isSuccessful, true);
// 		});
// 	});
// 	describe("insertMatrixData", () => {
// 		const account: IBionamicUser = {
// 			user_id: "testsson123",
// 			email: "test@test.com",
// 			name: "testsson",
// 			permission: 1,
// 			status: 1,
// 		};
// 		const repository: IRepository = {
// 			repository_id: "haskdajksd",
// 			name: "svens repo",
// 			status: 1,
// 		};
// 		const event: IInsertEvent = {
// 			event_id: "h23HG4",
// 			user_id: account.user_id,
// 			event_: Buffer.from("100110110"),
// 			repository_id: repository.repository_id,
// 		};
// 		const matrix: IMatrix = {
// 			item_count: 5,
// 			matrix: Buffer.from("101011101"),
// 			repository_id: repository.repository_id,
// 			event_id: event.event_id,
// 		};
// 		test("Should not throw error when successful", async () => {
// 			await assert.doesNotReject(() =>
// 				databaseInteraction.insertMatrix(matrix),
// 			);
// 		});
// 		test("Should save successfully to DB", async () => {
// 			await databaseInteraction.insertMatrix(matrix);
// 			const fetchedData = await client.query("SELECT * FROM matrix;");
// 			const data = fetchedData.rows[0];
// 			assert.deepStrictEqual(data, matrix);
// 		});
// 		test("Should return true after successful insert", async () => {
// 			const isSuccessful = await databaseInteraction.insertMatrix(matrix);
// 			await assert.equal(isSuccessful, true);
// 		});
// 	});
// 	describe("insertAPIkey", () => {
// 		const currentDate = new Date("2023-10-18");
// 		const key: IApiKey = {
// 			api_id: "tjoho",
// 			key: "String",
// 			permission_level: 123,
// 			expires: currentDate,
// 		};
// 		test("Should not throw error when successful", async () => {
// 			await assert.doesNotReject(() => databaseInteraction.insertApiKey(key));
// 		});
// 		test("Should save successfully to DB", async () => {
// 			const fetchedData = await client.query("SELECT * FROM api_key;");
// 			const data = fetchedData.rows[0];
// 			assert.deepStrictEqual(data, key);
// 		});
// 		test("Should return true after successful insert", async () => {
// 			const isSuccessful = await databaseInteraction.insertApiKey(key);
// 			await assert.equal(isSuccessful, true);
// 		});
// 	});
// });
