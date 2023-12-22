interface IUser {
	user_id: string;
	email: string;
	name: string;
	permission: number;
	status: number;
}
interface IUserModel {
	getMany(offset: number, limit: number): Promise<IUser[]>;
	getTotalCount(): Promise<number>;
	getById(id: string): Promise<IUser | null>;
	insertOne(user: IUser): Promise<void>;
}

export type { IUser, IUserModel };
