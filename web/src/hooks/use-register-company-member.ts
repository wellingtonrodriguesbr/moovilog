import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface RegisterCompanyMemberData {
  userId: string;
  role: "ADMIN" | "FINANCIAL" | "OPERATIONAL" | "MEMBER" | undefined;
}

export function useRegisterCompanyMember() {
  const {
    mutateAsync: registerCompanyMember,
    isPending: isPendingRegisterCompanyMember,
  } = useMutation({
    mutationFn: handleRegisterCompanyMember,
    onSuccess: () => {
      toast.success("Membro cadastrado com sucesso");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        toast.error("Já existe uma conta com este e-mail");
      }
    },
  });

  async function handleRegisterCompanyMember({
    userId,
    role,
  }: RegisterCompanyMemberData) {
    const { data } = await api.post<{ companyMemberId: string }>(
      "/companies/member",
      {
        userId,
        role,
      }
    );
    return data;
  }

  return { registerCompanyMember, isPendingRegisterCompanyMember };
}
