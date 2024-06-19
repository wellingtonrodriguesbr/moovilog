export function formatCNPJ(cnpj: string) {
  const cleanedCNPJ = cnpj.replace(/\D/g, "");

  // Aplica a formatação ao CNPJ
  const formattedCNPJ = cleanedCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );

  return formattedCNPJ;
}
