export interface CreateManyParams {
	freightId: string;
	citiesIds: string[];
}

export interface CitiesByFreightRepository {
	createMany(params: CreateManyParams): Promise<void>;
}
