import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";

interface LoginData {
	email: string;
	password: string;
}

export function useLogin() {
	const [_, setAccessToken] = useLocalStorage("accessToken");
	const { mutateAsync: login, isPending: isPendingLogin } = useMutation({
		mutationFn: handleLogin,
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
