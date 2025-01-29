export interface Driver {
	id: string;
	name: string;
	documentNumber: string;
	phone: string;
	status: "ACTIVE" | "INACTIVE" | "PENDING";
	type: "AGGREGATE" | "FREELANCER" | "INTERNAL";
	createdAt: Date;
	updatedAt: Date;
	creatorId: string;
	companyId: string;
	addressId: string | null;
}
