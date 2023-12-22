import { respUnauthorized } from "../../controllers/shared/server-response";
import { IApiKeyModel } from "../../models/api-key/api-key-model-interfaces";
import {
	PERMISSION_LEVELS,
	type ApiKeyAuthMiddleware,
} from "./api-key-middleware-interfaces";
import { Logger } from "winston";

function hasReadPermission(permission: number): boolean {
	return (
		permission === PERMISSION_LEVELS.READ ||
		permission === PERMISSION_LEVELS.READ_WRITE ||
		permission === PERMISSION_LEVELS.ADMIN
	);
}
function hasReadWritePermission(permission: number) {
	return (
		permission === PERMISSION_LEVELS.READ_WRITE ||
		permission === PERMISSION_LEVELS.ADMIN
	);
}
function hasAdminPermission(permission: number) {
	return permission === PERMISSION_LEVELS.ADMIN;
}
function hasPermissionFactory(permissionLevel: number, logger: Logger) {
	if (permissionLevel === PERMISSION_LEVELS.READ) {
		logger.info("Permission level: READ");
		return hasReadPermission;
	} else if (permissionLevel === PERMISSION_LEVELS.READ_WRITE) {
		logger.info("Permission level: READ_WRITE");
		return hasReadWritePermission;
	} else if (permissionLevel === PERMISSION_LEVELS.ADMIN) {
		logger.info("Permission level: ADMIN");
		return hasAdminPermission;
	} else {
		logger.error(`Unknown permission level ${permissionLevel}`);
		throw new Error(`Unknown permission level ${permissionLevel}`);
	}
}

export function createApiKeyAuthMiddleware(
	apiKeyModel: IApiKeyModel,
	logger: Logger,
): ApiKeyAuthMiddleware {
	return (permissionLevel) => {
		const hasPermission = hasPermissionFactory(permissionLevel, logger);

		return async (request, response, next) => {
			try {
				const authorizationHeader = request.header("Authorization");
				if (!authorizationHeader) {
					logger.warn("Missing Authorization header");
					return respUnauthorized(response, logger);
				}

				const [type, token] = authorizationHeader.split(" ");
				if (type !== "Bearer") {
					logger.warn("Invalid Authorization type");
					return respUnauthorized(response, logger);
				}

				if (!token) {
					logger.warn("Missing token in Authorization header");
					return respUnauthorized(response, logger);
				}

				const apiKey = await apiKeyModel.getById(token);

				if (!apiKey) {
					logger.warn("Invalid API key");
					return respUnauthorized(response, logger);
				}

				const hasExpired = apiKey.expires.getTime() <= new Date().getTime();
				if (hasExpired) {
					logger.warn("API key has expired");
					return respUnauthorized(response, logger);
				}

				if (!hasPermission(apiKey.permission_level)) {
					logger.warn("Insufficient permissions");
					return respUnauthorized(response, logger);
				}

				return next();
			} catch (error) {
				logger.error(`Error in createApiKeyAuthMiddleware: ${error}`);
				return respUnauthorized(response, logger);
			}
		};
	};
}
