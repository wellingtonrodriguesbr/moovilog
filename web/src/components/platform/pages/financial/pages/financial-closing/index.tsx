import { BackPageButton } from "@/components/platform/back-page-button";

export function FinancialClosing() {
	return (
		<section className="flex flex-col gap-12">
			<header className="flex flex-col items-start gap-12">
				<BackPageButton href="/financeiro" />
				<h1 className="text-2xl md:text-3xl font-medium">
					Fechamento financeiro
				</h1>
			</header>
			<div className="flex flex-col gap-12"></div>
		</section>
	);
}
