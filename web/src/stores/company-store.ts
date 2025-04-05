import { Company } from "@/interfaces";
import { create } from "zustand";

interface CompanyStore {
	company: Company | null;
	isLoading: boolean;
	setCompany: (company: Company) => void;
	setLoading: (loading: boolean) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
	company: null,
	isLoading: true,
	setCompany: (company) => set({ company, isLoading: false }),
	setLoading: (loading) => set({ isLoading: loading }),
}));
