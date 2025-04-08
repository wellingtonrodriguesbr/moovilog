"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSendEmailToResetPassword } from "@/hooks/user/use-send-email-to-reset-password";

const formSchema = z.object({
	email: z.string().email({ message: "Digite um endereço de e-mail válido" }),
});

export function EnterYourEmailForm() {
	const router = useRouter();
	const { sendEmailToResetPassword, isPendingSendEmailToResetPassword } =
		useSendEmailToResetPassword();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await sendEmailToResetPassword({
				email: data.email,
			});
			form.reset();
			router.push("/redefinir-senha/sucesso");
			toast.success("Solicitação enviada com sucesso");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 409) {
					toast.error("Já existe uma conta com este e-mail");
				}
			}

			toast.error("Erro ao redefinir senha, fale com o suporte");
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4 w-full"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input
										placeholder="seuemail@email.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						disabled={isPendingSendEmailToResetPassword}
						type="submit"
						className="w-full"
					>
						{isPendingSendEmailToResetPassword ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							"Salvar"
						)}
					</Button>
				</form>
			</Form>
			<div className="flex justify-center items-center mt-4">
				<Link href="/entrar" className="w-fit text-center">
					Lembrou da senha?{" "}
					<span className="underline font-medium">Faça login</span>
				</Link>
			</div>
		</>
	);
}
