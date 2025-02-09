export function formatCurrencyBR(valueInCents: number) {
	if (typeof valueInCents !== "number" || isNaN(valueInCents)) {
		throw new Error("O valor deve ser um número válido.");
	}

	const valueInReais = valueInCents / 100;
	return valueInReais.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}
