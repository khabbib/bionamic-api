export interface IEvent {
	event_id: string;
	index: number;
	date: Date;
	user_id: string;
	event_: Buffer;
	repository_id: string;
}

export interface IInsertEvent {
	event_id: string;
	user_id: string;
	event_: Buffer;
	repository_id: string;
}

export interface EventData {
	type: string;
	repositoryId: string;
	userId: string;
	value: number;
}
export interface IHandleEvent {
	id: string;
	type: "decrement" | "increment";
	repositoryId: string;
	value: number;
	userId: string;
}

export interface IEventModel {
	getMany(offset: number, limit: number): Promise<IEvent[]>;
	getById(id: string): Promise<IEvent | null>;
	insertOne(event: IInsertEvent): Promise<void>;
}
