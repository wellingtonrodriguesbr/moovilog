export function formatWeight(weight: number): string {
	const numericWeight = String(weight).replace(/\D/g, "");

	return numericWeight.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
