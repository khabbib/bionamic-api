import { Client } from "pg";
import { CONFIG } from "./config";

export const postgresqlClient = new Client({
	host: CONFIG.POSTGRE_SQL.HOST,
	port: CONFIG.POSTGRE_SQL.PORT,
	database: CONFIG.POSTGRE_SQL.DATABASE,
	user: CONFIG.POSTGRE_SQL.USER,
	password: CONFIG.POSTGRE_SQL.PASSWORD,
});
