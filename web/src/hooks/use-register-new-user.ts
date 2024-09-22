import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface RegisterNewUserData {
	name: string;
	email: string;
	password: string;
	role: "ADMIN" | "FINANCIAL" | "OPERATIONAL" | "MEMBER";
}

export function useRegisterNewUser() {
	const {
		mutateAsync: registerNewUser,
		isPending: isPendingRegisterNewUser,
	} = useMutation({
		mutationFn: handleRegisterNewUser,
		onError: (error: AxiosError) => {
			if (error.response?.status === 409) {
				toast.error("Já existe uma conta com este e-mail");
			}
		},
	});

	async function handleRegisterNewUser({
		name,
		email,
		password,
		role,
	}: RegisterNewUserData) {
		const { data } = await api.post<{ userId: string }>("/users", {
			name,
			email,
			password,
			role: role,
		});

		return data;
	}

	return { registerNewUser, isPendingRegisterNewUser };
}
