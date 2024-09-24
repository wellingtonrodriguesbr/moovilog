export function formatPlate(plate: string): string {
	const part1 = plate.slice(0, 3);
	const part2 = plate.slice(3);

	return `${part1}-${part2}`;
}
