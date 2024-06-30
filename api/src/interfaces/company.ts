import { $Enums, Company } from "@prisma/client";

export interface ICompany extends Company {}

export type ICompanyTypes = $Enums.CompanyType;
export type ICompanySizes = $Enums.CompanySize;
