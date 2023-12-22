interface IMatrix {
	item_count: number;
	matrix: Buffer;
	repository_id: string;
	event_id: string;
}
interface IMatrixModel {
	getMany(offset: number, limit: number): Promise<IMatrix[]>;
	getByEventId(id: string): Promise<IMatrix | null>;
	getByRepositoryId(repositoryId: string): Promise<IMatrix | null>;
	insertOne(matrixData: IMatrix): Promise<void>;
	updateByEventId(
		repositoryId: string,
		eventId: string,
		newMatrix: Buffer,
	): Promise<void>;
}

export type { IMatrix, IMatrixModel };
