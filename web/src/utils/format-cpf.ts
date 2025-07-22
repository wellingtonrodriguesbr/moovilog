export function formatCPF(cpf: string): string {
  const numericCPF = cpf.replace(/\D/g, "");

  if (numericCPF.length <= 3) {
    return numericCPF;
  } else if (numericCPF.length <= 6) {
    return `${numericCPF.slice(0, 3)}.${numericCPF.slice(3)}`;
  } else if (numericCPF.length <= 9) {
    return `${numericCPF.slice(0, 3)}.${numericCPF.slice(3, 6)}.${numericCPF.slice(6)}`;
  } else {
    return `${numericCPF.slice(0, 3)}.${numericCPF.slice(3, 6)}.${numericCPF.slice(6, 9)}-${numericCPF.slice(9, 11)}`;
  }
}
