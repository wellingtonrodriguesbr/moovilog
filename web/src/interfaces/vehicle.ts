export interface Vehicle {
	id: string;
	plate: string;
	trailerPlate: string | null;
	year: number;
	brand: string;
	model: string;
	category: string;
	type: string;
	body: string;
	fullLoadCapacity: number;
	createdAt: Date;
	updatedAt: Date;
	companyId: string;
	creatorId: string;
}
