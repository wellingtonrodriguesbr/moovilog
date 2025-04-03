import { COMPANY_MEMBER_PERMISSIONS } from "@/utils/mocks/company-member-permissions";

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
	extraData: {
		permissions: (typeof COMPANY_MEMBER_PERMISSIONS)[number]["key"][];
	};
}
