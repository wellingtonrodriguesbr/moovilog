import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";

export function useLogout() {
	const [_, __, remove] = useLocalStorage("accessToken");
	const { mutateAsync: logout, isPending: isPendingLogout } = useMutation({
		mutationFn: handleLogout,
	});

	async function handleLogout() {
		const { data } = await api.post("/sessions/logout");

		remove();
		return data;
	}

	return { logout, isPendingLogout };
}
