import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyStore {
	companyId: string | null;
	setCompanyId: (id: string | null) => void;
}

export const useCompanyStore = create(
	persist<CompanyStore>(
		(set) => ({
			companyId: null,
			setCompanyId: (id) => set({ companyId: id }),
		}),
		{
			name: "company-storage",
		}
	)
);
