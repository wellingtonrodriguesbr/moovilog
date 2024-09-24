export function formatPhone(phone: string): string {
	const ddd = phone.slice(0, 2);
	const part1 = phone.slice(2, 7);
	const part2 = phone.slice(7);

	return `(${ddd}) ${part1}-${part2}`;
}
