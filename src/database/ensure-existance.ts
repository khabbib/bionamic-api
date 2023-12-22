import { Client } from "pg";
import { logger } from "../shared/winston";

// Move to respective model classes
async function ensureUserId(id: string, client: Client): Promise<boolean> {
	const query =
		"SELECT EXISTS (SELECT 1 FROM bionamic_user WHERE user_id = $1)";
	try {
		const result = await client.query(query, [id]);
		logger.info({ result });
		// return result.rows.;
		return true; // Validate the return value
	} catch (error) {
		logger.error("Error checking user ID existence:", error);
		throw new Error("Error checking user ID existence:");
	}
}

export { ensureUserId };
