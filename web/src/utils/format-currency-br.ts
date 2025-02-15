export function formatCurrencyBR(value: string | number): string {
	const numericValue = String(value).replace(/[^0-9-]/g, "");

	const parsedValue = Number(numericValue) / 100;

	return parsedValue.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}
