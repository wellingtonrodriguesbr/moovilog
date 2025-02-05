export interface Freight {
	id: string;
	type: string;
	modality: string;
	date: Date;
	pickupsQuantity: number;
	deliveriesQuantity: number;
	totalWeightOfPickups: string;
	totalWeightOfDeliveries: string;
	freightAmountInCents: number;
	observation: string | null;
	createdAt: Date;
	updatedAt: Date;
	driverId: string;
	vehicleId: string;
	creatorId: string;
	companyId: string;
	routeId: string;
	cityId: string | null;
}
