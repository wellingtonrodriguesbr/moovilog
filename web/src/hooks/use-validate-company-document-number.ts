import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "react-use";
import { toast } from "sonner";

interface UseValidateCompanyDocumentNumberProps {
  documentNumber: string;
}

export function useValidateCompanyDocumentNumber({
  documentNumber,
}: UseValidateCompanyDocumentNumberProps) {
  const [isReady] = useDebounce(
    () => {
      setDebouncedValue(documentNumber);
    },
    2000,
    [documentNumber]
  );
  const [debouncedValue, setDebouncedValue] = useState("");

  const { isPending, status } = useQuery({
    queryKey: ["validate-company-document-number"],
    queryFn: () => handleValidDocumentNumber({ documentNumber }),
    enabled: !!isReady() && !!debouncedValue.length,
  });

  async function handleValidDocumentNumber({
    documentNumber,
  }: {
    documentNumber: string;
  }) {
    try {
      const { data } = await axios.get(
        `https://brasilapi.com.br/api/cnpj/v1/${documentNumber}`
      );

      toast.success("CNPJ encontrado com sucesso");
      return data;
    } catch (error) {
      toast.error("CNPJ inválido");
      console.log(error);
    }
  }

  return {
    isValidateCompanyDocumentNumberPending: isPending,
    status,
  };
}
