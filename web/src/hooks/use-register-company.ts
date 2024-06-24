import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface RegisterCompanyData {
  name: string;
  documentNumber: string;
  type: "HEADQUARTERS" | "BRANCH" | "AGENCY";
  size: "MICRO" | "SMALL" | "MEDIUM" | "BIG";
}

interface Response {
  company: {
    id: string;
    name: string;
    documentNumber: string;
    type: string;
    size: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
  };
}

export function useRegisterCompany() {
  const { mutateAsync: registerCompany, isPending: isPendingRegisterCompany } =
    useMutation({
      mutationFn: handleRegisterCompany,
      onSuccess: () => {
        toast.success("Empresa cadastrada com sucesso");
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 401) {
          toast.error("Você não tem permissão para esta ação");
        }
        if (error.response?.status === 409) {
          toast.error("Já existe uma empresa com este CNPJ");
        }
      },
    });

  async function handleRegisterCompany({
    name,
    documentNumber,
    type,
    size,
  }: RegisterCompanyData) {
    const { data } = await api.post<{ company: Response }>("/companies", {
      name,
      documentNumber,
      type,
      size,
    });
    return data.company;
  }

  return { registerCompany, isPendingRegisterCompany };
}
