import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface AuthLinkResponse {
	userId: string;
}

export function useValidateAuthLink() {
	const searchParams = useSearchParams();
	const code = searchParams?.get("codigo");
	const redirectLink = searchParams?.get("redirect");

	const router = useRouter();

	const {
		data: userId,
		isPending: isValidateAuthLinkPending,
		status,
	} = useQuery({
		queryKey: ["validate-auth-link"],
		queryFn: handleValidateAuthLink,
		enabled: !!code,
	});

	async function handleValidateAuthLink() {
		try {
			const { data } = await api.get<AuthLinkResponse>(
				`/token/${code}/validate`
			);

			router.push(
				redirectLink
					? `${redirectLink}?id=${data.userId}`
					: `/concluir-cadastro?id=${data.userId}`
			);

			return data.userId;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 400) {
					toast.error(
						"Código expirado ou inválido, solicite um novo."
					);
				}
				if (error.response?.status === 404) {
					toast.error("Código não encontrado");
				}
			}
		}
	}

	return {
		userId,
		isValidateAuthLinkPending,
		status,
	};
}
