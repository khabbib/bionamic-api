interface IApiKey {
	api_id: string;
	key: string;
	permission_level: number;
	expires: Date;
}
interface IUser {
	user_id: string;
	email: string;
	name: string;
	permission: number;
	status: number;
}
export type { IApiKey, IUser };
