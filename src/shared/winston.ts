import winston from "winston";
import fs from "fs";
import path from "path";

const logsDir = "logs";
const logsErrorFile = path.join(logsDir, "error.log");
const logsInfoFile = path.join(logsDir, "process.log");

if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir);
	console.log(`Created directory: ${logsDir}`);
}

export const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	defaultMeta: { service: "Bionamic API-server" },
	transports: [
		new winston.transports.File({
			filename: logsErrorFile,
			level: "error",
		}),
		new winston.transports.File({
			filename: logsInfoFile,
			level: "info",
		}),
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	],
});
