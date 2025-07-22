import { Company } from "@/interfaces";
import { api } from "@/lib/axios";
import { useCompanyStore } from "@/stores/company-store";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";

export function useLogout() {
  const [_, __, remove] = useLocalStorage("accessToken");
  const { setCompany } = useCompanyStore();
  const { mutateAsync: logout, isPending: isPendingLogout } = useMutation({
    mutationFn: handleLogout,
  });

  async function handleLogout() {
    const { data } = await api.post("/sessions/logout");

    remove();
    setCompany({} as Company);
    return data;
  }

  return { logout, isPendingLogout };
}
