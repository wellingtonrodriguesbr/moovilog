export function formatWeight(weight: number | string): string | undefined {
	const transformedWeight = weight ? Number(weight) : undefined;
	return transformedWeight
		? new Intl.NumberFormat("pt-BR").format(transformedWeight)
		: undefined;
}
