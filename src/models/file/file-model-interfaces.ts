export interface IFile {
	file_id: string;
	date: Date;
	size: number;
	content: Buffer;
	content_type: string;
}

export interface IFileModel {
	getMany(offset: number, limit: number): Promise<IFile[]>;
	getById(id: string): Promise<IFile | null>;
	insertOne(event: IFile): Promise<void>;
}
