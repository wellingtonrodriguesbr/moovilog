export function financialHealth(profitPercentage: number): string {
	if (profitPercentage > 90) return "Extraordinária";
	if (profitPercentage >= 80) return "Ótima";
	if (profitPercentage >= 50) return "Boa";
	if (profitPercentage >= 20) return "Regular";
	if (profitPercentage >= 0) return "Crítica";
	return "Prejuízo";
}
