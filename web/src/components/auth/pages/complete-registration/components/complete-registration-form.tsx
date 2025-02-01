"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useUpdateUserPassword } from "@/hooks/auth/use-update-user-password";

const formSchema = z
	.object({
		newPassword: z
			.string()
			.min(8, { message: "A senha precisa ter no mínimo 8 caracteres" }),
		confirmNewPassword: z
			.string()
			.min(8, { message: "A senha precisa ter no mínimo 8 caracteres" }),
		acceptTerms: z.boolean({ message: "Aceite os termos para prosseguir" }),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		path: ["confirmNewPassword"],
		message: "As senhas precisam ser iguais",
	});

export function CompleteRegistrationForm() {
	const router = useRouter();
	const { updateUserPassword, isPendingUpdateUserPassword } =
		useUpdateUserPassword();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			newPassword: "",
			confirmNewPassword: "",
			acceptTerms: false,
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await updateUserPassword({
				newPassword: data.newPassword,
				confirmNewPassword: data.confirmNewPassword,
			});
			toast.success("Senha alterada com sucesso");
			router.push("/entrar");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 409) {
					toast.error("Já existe uma conta com este e-mail");
				}
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-full"
			>
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="*********"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmNewPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirme sua senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="*********"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="acceptTerms"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<FormLabel
									htmlFor={field.name}
									className="flex items-center gap-2 text-sm font-medium"
								>
									<Checkbox
										id={field.name}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									Ao se cadastrar, você concorda com os termos
									e a política de privacidade da plataforma.
								</FormLabel>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={
						!form.watch("acceptTerms") ||
						isPendingUpdateUserPassword
					}
					type="submit"
					className="w-full mt-6"
				>
					{isPendingUpdateUserPassword ? (
						<Loader2 className="size-4 animate-spin" />
					) : (
						"Salvar"
					)}
				</Button>
			</form>
		</Form>
	);
}
