import { CompanyMember } from "@prisma/client";
import { CompanyMemberPermission } from "./company-member-permission";

export type ICompanyMember = CompanyMember;

export type ICompanyMemberExtraData = {
	permissions: CompanyMemberPermission[];
};
