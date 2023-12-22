import * as dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
	SERVER: {
		PORT: 3000,
		HOST_NAME: "0.0.0.0",
		SERVER_NAME: "Bionamic API",
	},
	POSTGRE_SQL: {
		HOST: String(process.env["HOST"]),
		PORT: Number(process.env["PORT"]),
		USER: String(process.env["USER_"]),
		DATABASE: String(process.env["DATABASE"]),
		PASSWORD: String(process.env["PASSWORD"]),
	},
} as const;
