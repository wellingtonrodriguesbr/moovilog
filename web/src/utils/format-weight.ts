export function formatWeight(weight: number | string): string {
	const transformedWeight = Number(weight);
	return new Intl.NumberFormat("pt-BR").format(transformedWeight);
}
