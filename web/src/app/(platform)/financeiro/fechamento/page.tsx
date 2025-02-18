import { Metadata } from "next";
import { FinancialClosing } from "@/components/platform/pages/financial/pages/financial-closing";

export const metadata: Metadata = {
	title: "Fechamento financeiro | Moovilog",
	description: "",
};

export default function FinancialClosingPagePlatform() {
	return (
		<main>
			<FinancialClosing />
		</main>
	);
}
