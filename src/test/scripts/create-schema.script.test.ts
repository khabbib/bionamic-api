// import { describe, it, before, after, beforeEach, afterEach } from "node:test";
// import { Database } from "../../database/database";
// import { strictEqual } from "node:assert";
// import { Client } from "pg";
// import * as dotenv from "dotenv";
// dotenv.config();

// const host = process.env["HOST"];
// const port = Number(process.env["PORT"]);
// const user = process.env["USER_"];
// const database = process.env["DATABASE"];
// const password = process.env["PASSWORD"];

// describe("create-schema.ts", () => {
// 	let client: Client;
// 	before(async () => {
// 		client = new Client({ database, host, port, user, password });
// 		await client.connect();
// 	});
// 	beforeEach(async () => {
// 		await client.query(`CREATE DATABASE "DB-TEST"`);
// 	});
// 	afterEach(async () => {
// 		await client.query(`DROP DATABASE "DB-TEST"`);
// 	});
// 	after(async () => {
// 		await client.end();
// 	});
// 	describe("Testing create schema functionality", () => {
// 		it("Should create schema when called once", async () => {
// 			const database = new Database(client);
// 			const isSuccessful = await database.createSchema();
// 			strictEqual(isSuccessful, true);
// 		});
// 		it("Should create schema when called more than once", async () => {
// 			const database = new Database(client);
// 			await database.createSchema();
// 			const isSuccessful = await database.createSchema();
// 			strictEqual(isSuccessful, true);
// 		});
// 	});
// });
