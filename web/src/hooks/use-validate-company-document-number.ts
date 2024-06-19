import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function useValidateCompanyDocumentNumber() {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  async function handleValidDocumentNumber({
    documentNumber,
  }: {
    documentNumber: string;
  }) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://brasilapi.com.br/api/cnpj/v1/${documentNumber}`
      );

      setIsValid(true);
      return data;
    } catch (error) {
      setIsValid(false);

      toast.error("CNPJ inválido");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { isValid, isLoading, handleValidDocumentNumber };
}
