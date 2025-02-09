export function formatWeight(weight: number | string): string {
	const numericWeight = String(weight).replace(/\D/g, "");

	return numericWeight.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
