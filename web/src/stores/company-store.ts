import { Company } from "@/interfaces";
import { create } from "zustand";

interface CompanyStore {
	company: Company;
	setCompany: (company: Company) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => {
	return {
		company: {} as Company,
		setCompany: (company: Company) => set({ company }),
	};
});
