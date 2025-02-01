import { Company } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyStore {
	company: Company;
	setCompany: (company: Company) => void;
}

export const useCompanyStore = create(
	persist<CompanyStore>(
		(set) => ({
			company: {} as Company,
			setCompany: (company) => set({ company }),
		}),
		{
			name: "company-storage",
		}
	)
);
