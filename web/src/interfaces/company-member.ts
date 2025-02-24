export interface CompanyMember {
	id: string;
	sector: string;
	role: "ADMIN" | "FINANCIAL" | "OPERATIONAL" | "MANAGER" | "COMERCIAL";
	status: "ACTIVE" | "INACTIVE" | "PENDING";
	createdAt: string;
	updatedAt: string;
	userId: string;
	companyId: string;
	user: {
		name: string;
		email: string;
		phone: string;
		createdAt: string;
		updatedAt: string;
	};
	companyMemberPermissions: {
		id: string;
		permission: USER_PERMISSIONS;
		companyMemberId: string;
	}[];
}

export enum USER_PERMISSIONS {
	MANAGE_SHIPMENTS_AND_PICKUPS,
	VIEW_SHIPMENTS_AND_PICKUPS,
	MANAGE_VEHICLES_AND_DRIVERS,
	VIEW_VEHICLES_AND_DRIVERS,
	MANAGE_ROUTES,
	VIEW_ROUTES,
	MANAGE_RESOURCES_AND_SUPPLIES,
	VIEW_RESOURCES_AND_SUPPLIES,
	MANAGE_NOTICES,
	VIEW_NOTICES,
	MANAGE_DAILY_SCHEDULE,
	VIEW_DAILY_SCHEDULE,
	MANAGE_USERS,
	MANAGE_FINANCES,
	VIEW_FINANCES,
	MANAGE_REPORTS,
	VIEW_REPORTS,
	MANAGE_SETTINGS,
	MANAGE_PERMISSIONS,
}
