import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

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
