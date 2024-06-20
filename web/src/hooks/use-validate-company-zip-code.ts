/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";

import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { toast } from "sonner";

interface UseValidateCompanyZipCodeProps {
  zipCode: string;
}

export function useValidateCompanyZipCode({
  zipCode,
}: UseValidateCompanyZipCodeProps) {
  const [isReady] = useDebounce(
    () => {
      setDebouncedValue(zipCode);
    },
    2000,
    [zipCode]
  );
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isPendingValidate, setIsPendingValidate] = useState(false);
  const [isValid, setIsValid] = useState(false);

  async function handleValidZipCode({ zipCode }: { zipCode: string }) {
    try {
      setIsPendingValidate(true);
      const { data } = await axios.get(
        `https://brasilapi.com.br/api/cep/v2/${zipCode}`
      );

      setIsValid(true);
      toast.success("CEP encontrado com sucesso");
      return data;
    } catch (error) {
      setIsValid(false);

      toast.error("CEP inválido");
      console.log(error);
    } finally {
      setIsPendingValidate(false);
    }
  }

  useEffect(() => {
    if (isReady() && debouncedValue.length) {
      handleValidZipCode({
        zipCode: debouncedValue,
      });
    }
  }, [isReady(), debouncedValue]);

  return {
    isValid,
    isPendingValidate,
    isReady: isReady(),
    handleValidZipCode,
  };
}
