import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface UpdateUserPasswordData {
	newPassword: string;
	confirmNewPassword: string;
}

export function useUpdateUserPassword() {
	const searchParams = useSearchParams();
	const userId = searchParams?.get("id");

	const {
		mutateAsync: updateUserPassword,
		isPending: isPendingUpdateUserPassword,
	} = useMutation({
		mutationFn: handleUpdateUserPassword,
	});

	async function handleUpdateUserPassword(
		updateData: UpdateUserPasswordData
	) {
		await api.patch("/user/update-password", {
			userId,
			...updateData,
		});
	}

	return { updateUserPassword, isPendingUpdateUserPassword };
}
