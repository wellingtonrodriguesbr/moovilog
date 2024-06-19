import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocalStorage } from "react-use";
import { toast } from "sonner";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const [_, setAccessToken] = useLocalStorage("accessToken");
  const { mutateAsync: login, isPending: isPendingLogin } = useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      toast.success("Login realizado com sucesso");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        toast.error("Não existe uma conta com este e-mail");
        return;
      }
      if (error.response?.status === 401) {
        toast.error("E-mail ou senha incorretos");
        return;
      }
    },
  });

  async function handleLogin({ email, password }: LoginData) {
    const { data } = await api.post<{ token: string }>("/sessions", {
      email,
      password,
    });

    setAccessToken(data.token);
    return data;
  }

  return { login, isPendingLogin };
}
