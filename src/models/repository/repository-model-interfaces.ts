interface IRepository {
	repository_id: string;
	name: string;
	status: number;
}
interface IRepositoryModel {
	insertOne(repository: IRepository): Promise<void>;
	getById(id: string): Promise<IRepository | null>;
	getMany(offset: number, limit: number): Promise<IRepository[]>;
	getTotalCount(): Promise<number>;
}

export type { IRepository, IRepositoryModel };
