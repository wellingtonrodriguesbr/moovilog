export function financialHealth(profitPercentage: number): string {
  if (profitPercentage > 30) return "Extraordinária";
  if (profitPercentage >= 30) return "Ótima";
  if (profitPercentage >= 19) return "Boa";
  if (profitPercentage >= 9) return "Regular";
  if (profitPercentage >= 0 && profitPercentage <= 4) return "Crítica";
  return "Prejuízo";
}
