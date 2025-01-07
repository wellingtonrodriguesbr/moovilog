export function formatPlate(plate: string): string {
	const cleanPlate = plate.replace(/-/g, "");

	const part1 = cleanPlate.slice(0, 3);
	const part2 = cleanPlate.slice(3);

	return part2 ? `${part1}-${part2}` : part1;
}
