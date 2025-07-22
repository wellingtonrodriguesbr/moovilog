import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface RegisterNewUserData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export function useRegisterNewUser() {
  const { mutateAsync: registerNewUser, isPending: isPendingRegisterNewUser } = useMutation({
    mutationFn: handleRegisterNewUser,
  });

  async function handleRegisterNewUser(registerData: RegisterNewUserData) {
    const { data } = await api.post<{ userId: string }>("/users", {
      ...registerData,
    });

    return data;
  }

  return { registerNewUser, isPendingRegisterNewUser };
}
