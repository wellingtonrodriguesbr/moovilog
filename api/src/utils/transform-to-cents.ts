export function transformToCents(value: string | number): number {
	let numericValue: number;

	if (typeof value === "string") {
		const sanitizedValue = value.trim().replace(",", ".");
		numericValue = parseFloat(sanitizedValue);

		if (isNaN(numericValue)) {
			throw new Error("Invalid value");
		}
	} else if (typeof value === "number") {
		numericValue = value;
	} else {
		throw new Error("Unsupported value type");
	}

	return Math.round(numericValue * 100);
}
