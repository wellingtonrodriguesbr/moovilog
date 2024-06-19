/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";

import { useEffect, useState } from "react";
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
  const [isPendingValidate, setIsPendingValidate] = useState(false);
  const [isValid, setIsValid] = useState(false);

  async function handleValidDocumentNumber({
    documentNumber,
  }: {
    documentNumber: string;
  }) {
    try {
      setIsPendingValidate(true);
      const { data } = await axios.get(
        `https://brasilapi.com.br/api/cnpj/v1/${documentNumber}`
      );

      setIsValid(true);
      toast.success("CNPJ encontrado com sucesso");
      return data;
    } catch (error) {
      setIsValid(false);

      toast.error("CNPJ inválido");
      console.log(error);
    } finally {
      setIsPendingValidate(false);
    }
  }

  useEffect(() => {
    if (isReady() && debouncedValue.length) {
      handleValidDocumentNumber({
        documentNumber: debouncedValue,
      });
    }
  }, [isReady(), debouncedValue]);

  return {
    isValid,
    isPendingValidate,
    isReady: isReady(),
    handleValidDocumentNumber,
  };
}
