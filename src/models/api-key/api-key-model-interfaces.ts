interface IApiKey {
	api_id: string;
	key: string;
	permission_level: number;
	expires: Date;
}
interface IApiKeyModel {
	insertOne(apiKey: IApiKey): Promise<void>;
	getMany(offset: number, limit: number): Promise<IApiKey[]>;
	getById(id: string): Promise<IApiKey | null>;
}

export type { IApiKey, IApiKeyModel };
