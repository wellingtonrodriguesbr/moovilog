import { $Enums, CompanyMember } from "@prisma/client";

export interface ICompanyMember extends CompanyMember {}

export type ICompanyMemberRoles = $Enums.Role;
