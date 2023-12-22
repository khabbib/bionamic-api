import { Client } from "pg";
import { Logger } from "winston";

export type IGetManyArgument = {
	table: string;
	className: string;
	client: Client;
	offset: number;
	limit: number;
};
export async function getMany<TRecord>(
	argument: IGetManyArgument,
	logger: Logger, // Assuming you have a Winston Logger instance
): Promise<TRecord[]> {
	const query = `SELECT * FROM ${argument.table} LIMIT $1 OFFSET $2`;

	try {
		logger.info(
			`Executing query: ${query}, Limit: ${argument.limit}, Offset: ${argument.offset}`,
		);
		const result = await argument.client.query(query, [
			argument.limit,
			argument.offset,
		]);
		logger.info(
			`Query executed successfully. Rows returned: ${result.rows.length}`,
		);
		return result.rows;
	} catch (error) {
		logger.error(`Error in ${argument.className} getMany method: ${error}`);
		throw error;
	}
}

export type IGetByIdArgument = {
	table: string;
	columnId: string;
	className: string;
	client: Client;
	id: string;
};
export async function getById<TRecord>(
	argument: IGetByIdArgument,
	logger: Logger, // Assuming you have a Winston Logger instance
): Promise<TRecord | null> {
	const query = `SELECT * FROM ${argument.table} WHERE ${argument.columnId} = $1`;
	try {
		logger.info(`Executing query: ${query}, ID: ${argument.id}`);
		const result = await argument.client.query(query, [argument.id]);
		const record = result.rows[0] ?? null;

		if (record) {
			logger.info(
				`Query executed successfully. Record found: ${JSON.stringify(record)}`,
			);
		} else {
			logger.warn(
				`Query executed successfully. No record found for ID: ${argument.id}`,
			);
		}

		return record;
	} catch (error) {
		logger.error(`Error in ${argument.className} getById method: ${error}`);
		throw error;
	}
}

export type IGetTotalArgument = {
	table: string;
	className: string;
	client: Client;
};
export async function getTotalCount(
	argument: IGetTotalArgument,
	logger: Logger, // Assuming you have a Winston Logger instance
): Promise<number> {
	const query = `SELECT COUNT(*) as count FROM ${argument.table}`;

	try {
		logger.info(`Executing query: ${query}`);
		const result = await argument.client.query(query);
		const totalCount = result.rowCount;

		logger.info(`Query executed successfully. Total count: ${totalCount}`);
		return totalCount;
	} catch (error) {
		logger.error(
			`Error in ${argument.className} getTotalCount method: ${error}`,
		);
		throw error;
	}
}

export type IEnsureIdArgument = {
	table: string;
	columnId: string;
	client: Client;
	id: string;
};
export async function ensureId(
	argument: IEnsureIdArgument,
	logger: Logger,
): Promise<boolean> {
	const query = `SELECT EXISTS (SELECT 1 FROM ${argument.table} WHERE ${argument.columnId} = $1)`;

	try {
		logger.info(`Checking existence of ID: ${argument.id}`);
		const result = await argument.client.query(query, [argument.id]);
		const idExists = result.rows[0]?.exists;

		if (idExists) {
			logger.info(`ID ${argument.id} exists`);
		} else {
			logger.warn(`ID ${argument.id} does not exist`);
		}

		return idExists;
	} catch (error) {
		logger.error(`Error checking existence of ID ${argument.id}: ${error}`);
		throw error;
	}
}

export type IInsertOne<TRecord> = {
	table: string;
	client: Client;
	insert: TRecord;
};
export async function insertOne<TRecord extends {}>(
	argument: IInsertOne<TRecord>,
	logger: Logger, // Assuming you have a Winston Logger instance
): Promise<void> {
	const columns = Object.keys(argument.insert).join(", ");
	const values = Object.values(argument.insert);
	const valuePlaceholders = values
		.map((_, index) => `$${index + 1}`)
		.join(", ");
	const query = `
		INSERT into ${argument.table}(${columns})
		VALUES (${valuePlaceholders});
	`;

	try {
		logger.info(
			`Inserting data into ${
				argument.table
			}. Query: ${query}, Values: ${JSON.stringify(values)}`,
		);
		await argument.client.query(query, values);
		logger.info("Data inserted successfully");
	} catch (error) {
		logger.error(`Error inserting data into ${argument.table}: ${error}`);
		throw new Error("Database error");
	}
}
