import { RequestHandler } from "express";

export const PERMISSION_LEVELS = {
	READ: 1,
	READ_WRITE: 2,
	ADMIN: 3,
} as const;

export type PermissionLevels =
	typeof PERMISSION_LEVELS[keyof typeof PERMISSION_LEVELS];

export type ApiKeyAuthMiddleware = (
	permissionLevel: PermissionLevels,
) => RequestHandler;
