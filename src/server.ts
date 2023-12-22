import express from "express";

import bodyParser from "body-parser";
import path from "path";
import { CONFIG } from "./shared/config";
import { logger } from "./shared/winston";
import { rootRoutes } from "./routes/root-routes";
import { postgresqlClient } from "./shared/postgresql-client";
import { createSchema, insertData } from "./database/database";

const server = express()
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(express.static(path.join(__dirname, "../public")))
	.get("/", (_req, res) => {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	})
	.use("/", rootRoutes);

(async () => {
	try {
		await postgresqlClient.connect();
		await createSchema();
		await insertData();
		server.listen(CONFIG.SERVER.PORT, () => {
			logger.info(`Server is running on port ${CONFIG.SERVER.PORT}`);
		});
	} catch (error) {
		logger.error("Error starting the server:", error);
	} finally {
		await postgresqlClient.end();
	}
})();
